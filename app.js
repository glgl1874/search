const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Load JSON data from file
let churchData;
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.error("Error loading data:", err);
        return;
    }
    churchData = JSON.parse(data);
});

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Search route
app.get('/search', (req, res) => {
    const query = req.query.name;
    if (!query) {
        return res.status(400).json({ error: "교회명을 입력해주세요" });
    }

    // Search for matching churches by name (partial match)
    const results = churchData.filter(item => item.교회명 && item.교회명.includes(query));
    if (results.length === 0) {
        return res.status(404).json({ message: "검색된 교회가 없습니다" });
    }

    // Return matching results
    res.json(results);
});

// Start server
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
