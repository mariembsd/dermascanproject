import Discussion from '../models/Discussion.model.js';
import Message from '../models/Message.model.js';
import Patient from '../models/Patient.model.js';
import Dermatologist from '../models/Dermatologist.model.js';
import Notification from '../models/Notification.model.js';


export const createDiscussion = async (req, res) => {
 const { patientId, dermatologistId } = req.body;

 try {
  let discussion = await Discussion.findOne({ patientId, dermatologistId });
  if (!discussion) {
   discussion = new Discussion({ patientId, dermatologistId });
   await discussion.save();
  }
  res.status(200).json(discussion);
 } catch (err) {
  console.error('Create Discussion Error:', err);
  res.status(500).json({ message: 'Failed to create discussion' });
 }
};

// export const sendMessage = async (req, res) => {
//  const { discussionId, senderId, senderRole, content } = req.body;

//  try {
//   const message = new Message({ discussionId, senderId, senderRole, content });
//   await message.save();
//   res.status(201).json(message);
//  } catch (err) {
//   console.error('Send Message Error:', err);
//   res.status(500).json({ message: 'Failed to send message' });
//  }
// };


export const sendMessage = async (req, res) => {
 const { discussionId, senderId, senderRole, content } = req.body;

 try {
  const message = new Message({ discussionId, senderId, senderRole, content });
  await message.save();

  const discussion = await Discussion.findById(discussionId);

  if (discussion) {
   let receiverId;
   let notificationContent = '';

   if (senderRole === 'patient') {
    const patient = await Patient.findById(senderId);
    if (patient) {
     receiverId = discussion.dermatologistId; 
     notificationContent = `💬 New message from ${patient.fullName}`;
    }
   } else if (senderRole === 'dermatologist') {
    const dermatologist = await Dermatologist.findById(senderId);
    if (dermatologist) {
     receiverId = discussion.patientId; 
     notificationContent = `💬 New message from Dr. ${dermatologist.fullName}`;
    }
   }

   if (receiverId && notificationContent) {
    await Notification.create({
     receiverId,
     content: notificationContent,
     type: 'message',
     isRead: false,
    });
   }
  }

  res.status(201).json(message);
 } catch (err) {
  console.error('Send Message Error:', err);
  res.status(500).json({ message: 'Failed to send message' });
 }
}

export const getMessages = async (req, res) => {
 const { discussionId } = req.params;

 try {
  const messages = await Message.find({ discussionId }).sort({ timestamp: 1 });
  res.status(200).json(messages);
 } catch (err) {
  console.error('Get Messages Error:', err);
  res.status(500).json({ message: 'Failed to get messages' });
 }
};

export const getDiscussionsByDermatologist = async (req, res) => {
 try {
  const dermatologistId = req.params.id;

  // Populate the patient info (including fullName)
  const discussions = await Discussion.find({ dermatologistId })
   .populate('patientId'); // ← gets full patient object (like patientId.fullName)

  // For each discussion, fetch its messages
  const discussionsWithMessages = await Promise.all(
   discussions.map(async (discussion) => {
    const messages = await Message.find({ discussionId: discussion._id }).sort({ createdAt: 1 });
    return {
     ...discussion.toObject(), // convert to plain object
     messages,
    };
   })
  );

  res.status(200).json(discussionsWithMessages);
 } catch (err) {
  console.error('Error fetching discussions:', err);
  res.status(500).json({ message: 'Failed to load discussions' });
 }
};

export const getDiscussionsByPatient = async (req, res) => {
 const { id } = req.params;

 try {
  const discussions = await Discussion.find({ patientId: id })
   .populate('dermatologistId', 'fullName email')
   .lean();

  for (const discussion of discussions) {
   const messages = await Message.find({ discussionId: discussion._id })
    .sort({ createdAt: 1 });

   discussion.messages = messages;
  }

  res.status(200).json(discussions);
 } catch (err) {
  console.error('Error fetching patient discussions:', err);
  res.status(500).json({ message: 'Failed to get discussions' });
 }
};


export const getLatestMessage = async (req, res) => {
 const { discussionId } = req.params;

 try {
  const message = await Message.findOne({ discussionId })
   .sort({ createdAt: -1 });
  res.status(200).json(message);
 } catch (err) {
  console.error('Get Latest Message Error:', err);
  res.status(500).json({ message: 'Failed to get latest message' });
 }
};

