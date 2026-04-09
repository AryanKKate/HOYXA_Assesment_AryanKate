const { tutors } = require('../data/mockData');

exports.getAllTutors = (req, res) => {
    res.json(tutors);
};

exports.searchTutors = (req, res) => {
    const { subject, name } = req.query;
    let filtered = tutors;
    if (subject) {
        filtered = filtered.filter((tutor) => tutor.subject === subject);
    }
    if (name) {
        filtered = filtered.filter((tutor) => tutor.name.toLowerCase().includes(name.toLowerCase()) );
    }
    res.json(filtered);
};

exports.bookTutor = (req, res) => {
    const { tutorId } = req.params;
    setTimeout(() => {
        res.json({
            success: true,
            message: `Session booked with tutor ID ${tutorId}`,
            sessionId: Math.random().toString(36).substring(7),
        });
    }, 2000);
};