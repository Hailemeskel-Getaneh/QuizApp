import ContactMessage from '../models/contactModel.js';

// Add a new contact message
export const addContactMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Ensure all required fields are provided
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newContactMessage = new ContactMessage({
            name,
            email,
            message,
        });

        await newContactMessage.save();
        res.status(201).json({ 
            message: 'Message submitted successfully', 
            contactMessage: newContactMessage 
        });
    } catch (error) {
        console.error('Error submitting message:', error);
        res.status(500).json({ message: 'Error submitting message', error: error.message });
    }
};

// Get all contact messages (for administrative purposes)
export const getAllContactMessages = async (req, res) => {
    try {
        const contactMessages = await ContactMessage.find();
        res.status(200).json(contactMessages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages', error: error.message });
    }
};
