const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

app.post('/calculate-btu', (req, res) => {
    try {
        const { volume, tempDiff } = req.body;

        if (volume === undefined || tempDiff === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (volume <= 0 || tempDiff <= 0) {
            return res.status(400).json({ error: 'Volume and Temperature Difference must be greater than 0' });
        }

        // Calculate BTUs
        const btu = volume * tempDiff * 0.24;

        res.json({
            btu: btu.toFixed(2)
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
