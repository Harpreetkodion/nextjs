import fs from 'fs';

export default function handler(req, res) {
    const { slug } = req.query;
    const filePath = `blogdata/${slug}.json`;

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {
            const jsonData = JSON.parse(data);
            res.status(200).json(jsonData);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.status(500).json({ error: 'Error parsing JSON data' });
        }
    });
}

// export default function handler(req, res) {
//     const { filePath } = req.query;

//     if (!filePath) {
//         return res.status(400).json({ error: 'File path is required' });
//     }

//     fs.readFile(filePath, 'utf-8', (err, data) => {
//         if (err) {
//             console.error('Error reading file:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             try {
//                 const jsonData = JSON.parse(data);
//                 res.status(200).json(jsonData);
//             } catch (parseError) {
//                 console.error('Error parsing JSON:', parseError);
//                 res.status(500).json({ error: 'Error parsing JSON' });
//             }
//         }
//     });
// }