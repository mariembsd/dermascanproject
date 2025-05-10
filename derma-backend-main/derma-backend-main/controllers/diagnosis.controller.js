import DiagnosisModel from "../models/Diagnosis.model.js";


export const createDiagnosis = async (req, res) => {
 try {
  const {
   dermatologistId,
   patientId,
   diseaseName,
   description,
   severity,
   creationDate,
   expirationDate,
   medications
  } = req.body;

  const newDiagnosis = new DiagnosisModel({
   dermatologistId,
   patientId,
   diseaseName,
   description,
   severity,
   creationDate,
   expirationDate,
   medications
  });

  await newDiagnosis.save();
  res.status(201).json({ message: 'Diagnosis saved successfully', diagnosis: newDiagnosis });
 } catch (err) {
  console.error('Error creating diagnosis:', err);
  res.status(500).json({ message: 'Server error while creating diagnosis' });
 }
};

export const getDiagnosesByPatient = async (req, res) => {
 try {
  const { patientId } = req.params;
  const diagnoses = await DiagnosisModel.find({ patientId }).populate('dermatologistId', 'fullName');
  res.status(200).json(diagnoses);
 } catch (err) {
  console.error('Error fetching patient diagnoses:', err);
  res.status(500).json({ message: 'Server error while fetching diagnoses' });
 }
};

export const getDiagnosesByDermatologist = async (req, res) => {
 try {
  const { dermatologistId } = req.params;
  const diagnoses = await DiagnosisModel.find({ dermatologistId }).populate('patientId', 'fullName');
  res.status(200).json(diagnoses);
 } catch (err) {
  console.error('Error fetching dermatologist diagnoses:', err);
  res.status(500).json({ message: 'Server error while fetching diagnoses' });
 }
};

export const getLatestDiagnosisByPatient = async (req, res) => {
 try {
  const { patientId } = req.params;

  const diagnosis = await DiagnosisModel.findOne({ patientId })
   .sort({ createdAt: -1 })
   .limit(1);

  if (!diagnosis) {
   return res.status(404).json({ message: 'No diagnosis found for this patient.' });
  }

  res.status(200).json(diagnosis);
 } catch (error) {
  console.error('Error fetching latest diagnosis:', error);
  res.status(500).json({ message: 'Server error' });
 }
}