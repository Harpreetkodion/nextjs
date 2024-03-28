import fs from 'fs';

export default async function handler(req, res) {
    try {
        let data = await fs.promises.readdir("blogdata");
        data = data.slice(0, parseInt(req.query.count))
        let myfile;
        let allBlogs = [];
        for (let index = 0; index < data.length; index++) {
          const item = data[index];
          myfile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
          allBlogs.push(JSON.parse(myfile))
        }
        res.status(200).json(allBlogs)
    } catch (error) {

        console.error('Error reading files:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        
    }
}