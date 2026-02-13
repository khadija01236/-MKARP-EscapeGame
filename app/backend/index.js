const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const fs = require('fs');
const fsp = require('fs/promises');
const os = require('os');
const path = require('path');

const app = express();

const PORT = Number(process.env.PORT ?? 5000);
const DOCKER_IMAGE = process.env.DOCKER_IMAGE ?? 'kramp-sandbox';
const MAX_CODE_CHARS = Number(process.env.MAX_CODE_CHARS ?? 100_000);

const FLAG_OPTIONS = {
    '01': ['GG_PADAWAN', 'GG_NOOBMASTER', 'GG_NEO', 'GG_MARIO'],
    '02': ['BUILD_GREEN', 'GIT_MERGED', 'CI_OK', 'SHIP_IT'],
    '03': ['CRITICAL_TEMP', 'ITS_OVER_9000', 'RED_ALERT', 'MELTDOWN_AVERTED'],
    '04': ['INVENTORY_FULL', 'LOOT_SECURED', 'BAG_OF_HOLDING', 'ITEM_GET'],
    '05': ['ARC_REACTOR', 'POWER_UP', 'ENERGY_FULL', 'CHARGE_COMPLETE'],
    '06': ['FORTY_TWO', 'DONT_PANIC', 'ANSWER_42', 'H2G2_OK'],
    '07': ['KONAMI_CODE', 'UPUPDOWNDOWN', 'SECRET_UNLOCKED', 'EXTRA_LIFE'],
    '08': ['USE_THE_FORCE', 'SABER_READY', 'JEDI_MODE', 'SITH_MODE'],
    '09': ['NEW_HIGH_SCORE', 'TOP_1', 'GG_WP', 'LEGENDARY_RUN'],
    '10': ['YOU_SHALL_PASS', 'ONE_RING', 'ROOT_ACCESS', 'FINAL_BOSS_DOWN'],
};

// Middleware
app.use(cors());
app.use(express.json({ limit: '256kb' }));

function parseLevel(level) {
    const numeric = typeof level === 'string' ? Number.parseInt(level, 10) : level;
    if (!Number.isInteger(numeric)) return null;
    if (numeric < 1 || numeric > 10) return null;
    return numeric.toString().padStart(2, '0');
}

function getTestPath(levelString) {
    return path.resolve(__dirname, '../../Exercices', `test_level${levelString}.py`);
}

async function createTempPlayerFile(levelString, code) {
    const tempDir = await fsp.mkdtemp(path.join(os.tmpdir(), 'mkarp-'));
    const tempPath = path.join(tempDir, `level${levelString}.py`);
    await fsp.writeFile(tempPath, code, 'utf8');
    return { tempDir, tempPath };
}

function runPytestInDocker({ levelString, playerFilePath, testFilePath }) {
    const args = [
        'run',
        '--rm',
        '-v',
        `${playerFilePath}:/app/level${levelString}.py`,
        '-v',
        `${testFilePath}:/app/test_script.py`,
        DOCKER_IMAGE,
        'pytest',
        '/app/test_script.py',
    ];

    return new Promise((resolve, reject) => {
        const child = spawn('docker', args, { windowsHide: true });
        let stdout = '';
        let stderr = '';

        child.stdout.on('data', (chunk) => {
            stdout += chunk.toString();
        });
        child.stderr.on('data', (chunk) => {
            stderr += chunk.toString();
        });

        child.on('error', (err) => {
            reject(err);
        });

        child.on('close', (code) => {
            resolve({ exitCode: code ?? 1, stdout, stderr });
        });
    });
}

app.post('/run', async (req, res) => {
    const { code, level } = req.body ?? {};

    if (typeof code !== 'string') {
        return res.status(400).json({ success: false, output: 'ERREUR : champ "code" invalide.' });
    }
    if (code.length > MAX_CODE_CHARS) {
        return res.status(413).json({ success: false, output: `ERREUR : code trop volumineux (max ${MAX_CODE_CHARS} caractères).` });
    }

    const levelString = parseLevel(level);
    if (!levelString) {
        return res.status(400).json({ success: false, output: 'ERREUR : champ "level" invalide (attendu 1..10).' });
    }

    const testPath = getTestPath(levelString);
    if (!fs.existsSync(testPath)) {
        return res.status(404).json({
            success: false,
            output: `ERREUR : Le fichier de test Exercices/test_level${levelString}.py est introuvable.`,
        });
    }

    let tempDir = null;
    let tempPath = null;

    try {
        const tmp = await createTempPlayerFile(levelString, code);
        tempDir = tmp.tempDir;
        tempPath = tmp.tempPath;

        const { exitCode, stdout, stderr } = await runPytestInDocker({
            levelString,
            playerFilePath: tempPath,
            testFilePath: testPath,
        });

        const success = exitCode === 0;
        let flag = null;
        if (success) {
            const options = FLAG_OPTIONS[levelString] || ['GG'];
            flag = options[Math.floor(Math.random() * options.length)];
        }

        const output = [stdout, stderr].filter(Boolean).join('\n');
        return res.json({ success, output, flag });
    } catch (err) {
        const message = err && typeof err.message === 'string' ? err.message : String(err);
        const output = message.includes('ENOENT')
            ? 'ERREUR : docker est introuvable. Vérifie que Docker Desktop est installé et que la commande "docker" est disponible.'
            : `ERREUR : exécution impossible. ${message}`;
        return res.status(500).json({ success: false, output });
    } finally {
        if (tempDir) {
            try {
                await fsp.rm(tempDir, { recursive: true, force: true });
            } catch {
                // ignore cleanup errors
            }
        } else if (tempPath) {
            try {
                await fsp.rm(tempPath, { force: true });
            } catch {
                // ignore cleanup errors
            }
        }
    }
});
app.listen(PORT, () => {
    console.info(`MKARP backend listening on port ${PORT}`);
});