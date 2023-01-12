import { csvFileReaderGenerator } from '../csv/csvFileReaderGenerator'

for (let obj of csvFileReaderGenerator('./data/fake.csv')) console.log(obj)
