const router = require("express").Router();
const Students = require("../models/StudentsTest");

router.get("/", async (req, res) => {
  try {
    const students = await Students.find();
    if (!students.length) {
      return res.status(404).json({ message: "Students not found" });
    }
    return res.status(200).json({ data: students });
  } catch (error) {
    console.log(`Error fetching students: ${error}`);
    return res.status(200).json({ message: "Error fetching students!" });
  }
});

router.post("/create", async (req, res) => {
  const { fullname } = req.body;
  try {
    const students = await Students.create({
      fullname: fullname,
    });

    return res
      .status(200)
      .json({ message: "Student created successfully!", data: students });
  } catch (error) {
    console.log(`Error creating student: ${error}`);
    return res.status(200).json({ message: "Error creating students!" });
  }
});

router.put("/attendance/:id", async (req, res) => {
  const { was, date } = req.body;
  const { id } = req.params;

  try {
    const user = await Students.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }

    const providedDate = new Date(date);
    const now = new Date();

    if (providedDate.getFullYear() > now.getFullYear()) {
      return res
        .status(400)
        .json({ message: "Мы еще не дошли до этого года!" });
    }

    if (isNaN(providedDate.getTime())) {
      return res.status(400).json({ message: "Введите корректную дату!" });
    }

    const formattedProvidedDate = providedDate.toLocaleDateString("uz-UZ");

    const existingAttendance = user.attendance.find(
      (att) =>
        new Date(att.date).toLocaleDateString("uz-UZ") === formattedProvidedDate
    );

    if (existingAttendance) {
      existingAttendance.was = was;
    } else {
      user.attendance.push({
        date: providedDate.toISOString().split('T')[0],
        was: was,
      });
    }

    const updatedAttendance = await user.save();

    return res.status(200).json({
      message: "Student updated successfully!",
      data: updatedAttendance,
    });
  } catch (error) {
    console.log(`Error in updating attendance: \n ${error}`);
    return res.status(400).json({ message: `Error in updating attendance` });
  }
});

module.exports = router;
