import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import patientRoutes from './routes/patient.routes.js';
import dermatologistRoutes from './routes/dermatologist.routes.js';
import adminRoutes from './routes/admin.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';
import diagnosisRoutes from './routes/diagnosis.routes.js';
import chatRoutes from './routes/chat.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import path from 'path';


dotenv.config();

const app = express();

// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/dermatologists', dermatologistRoutes);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api/admins', adminRoutes);
app.use('/api', appointmentRoutes);
app.use('/api/diagnoses', diagnosisRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notifications', notificationRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(`🚀 Server running at http://localhost:${PORT}`);
});
