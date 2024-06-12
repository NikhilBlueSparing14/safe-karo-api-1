import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import DataModel from '../../models/dataModel.js';

// Path to local JSON file for storing data
const dataFilePath = path.join(process.cwd(), 'data', 'data.json');

// Ensure the data directory exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
    fs.mkdirSync(path.join(process.cwd(), 'data'));
}

const uploadExcel = async (req, res) => {
    try {
        if (!req.files || !req.files.excel) {
            return res.status(400).send('No files were uploaded.');
        }

        const file = req.files.excel;
        const workbook = XLSX.read(file.data, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const extractedData = worksheet.map((row) => ({
            vehicleType: row.vehicleType || row['Vehicle Type'],
            fuelType: row.fuelType || row['Fuel Type'],
            Engine: row.Engine,
            ncb: row.ncb,
            policyType: row.policyType || row['Policy Type'],
            caseType: row.caseType || row['Case Type'],
            companyName: row.companyName || row['Company Name'],
            make: row.make,
            model: row.model,
            age: row.age,
            OD: row.OD,
            TP: row.TP,
            RTO: row.RTO,
        }));

        // Store in MongoDB
        await DataModel.insertMany(extractedData);

        // Read existing data from the file
        let existingData = [];
        if (fs.existsSync(dataFilePath)) {
            const rawData = fs.readFileSync(dataFilePath);
            existingData = JSON.parse(rawData);
        }

        // Append the new data to existing data
        existingData.push(...extractedData);

        // Write updated data back to the file
        fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));

        res.status(200).json({ message: 'Data uploaded and stored successfully', data: extractedData });
    } catch (error) {
        res.status(500).json({ message: 'Error processing file', error: error.message });
    }
};

const getAllData = async (req, res) => {
    try {
        const dataFromMongo = await DataModel.find();
        
        // Read data from the local JSON file
        let dataFromFile = [];
        if (fs.existsSync(dataFilePath)) {
            const rawData = fs.readFileSync(dataFilePath);
            dataFromFile = JSON.parse(rawData);
        }

        // Combine data from MongoDB and local file
        const combinedData = {
            mongoData: dataFromMongo,
            fileData: dataFromFile
        };

        res.status(200).json(combinedData);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving data', error: error.message });
    }
};

export { uploadExcel, getAllData };
