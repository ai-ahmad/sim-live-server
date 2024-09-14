const StudentCoins = require('../models/CoinModel');
const Teacher = require('../models/Teachers'); // Assuming there's a Teacher model for validating the teacherToken

/**
 * Add coins to a student.
 * @param {String} studentId - The student's ID.
 * @param {Number} numberOfCoins - Number of coins to add.
 * @param {String} teacherToken - Token of the teacher adding coins.
 * @returns {Object} - The updated entry or an error message.
 */
const addCoinsToStudent = async (studentId, numberOfCoins, teacherToken) => {
  try {
    // Check if the teacher token is valid
    const teacher = await Teacher.findOne({ token: teacherToken });
    if (!teacher) {
      throw new Error('Invalid teacher token');
    }

    // Check if the number of coins is valid
    if (numberOfCoins <= 0) {
      throw new Error('Number of coins must be greater than zero');
    }

    // Create a new coins entry or update the existing one
    const existingCoinsEntry = await StudentCoins.findOne({ studentId });
    if (existingCoinsEntry) {
      existingCoinsEntry.numberOfCoins += numberOfCoins;
      await existingCoinsEntry.save();
      return { message: 'Coins added successfully', data: existingCoinsEntry };
    }

    const newCoinsEntry = new StudentCoins({
      studentId,
      numberOfCoins,
      teacherToken,
    });

    await newCoinsEntry.save();
    return { message: 'Coins added successfully', data: newCoinsEntry };
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Remove coins from a student.
 * @param {String} studentId - The student's ID.
 * @param {Number} numberOfCoins - Number of coins to remove.
 * @param {String} teacherToken - Token of the teacher removing coins.
 * @returns {Object} - The updated entry or an error message.
 */
const removeCoinsFromStudent = async (studentId, numberOfCoins, teacherToken) => {
  try {
    // Check if the teacher token is valid
    const teacher = await Teacher.findOne({ token: teacherToken });
    if (!teacher) {
      throw new Error('Invalid teacher token');
    }

    // Find the student's coins entry
    const studentCoins = await StudentCoins.findOne({ studentId });
    if (!studentCoins) {
      throw new Error('Student not found');
    }

    // Check if the student has enough coins
    if (studentCoins.numberOfCoins < numberOfCoins) {
      throw new Error('Insufficient coins');
    }

    // Subtract coins
    studentCoins.numberOfCoins -= numberOfCoins;

    // Save the updated entry
    await studentCoins.save();
    return { message: 'Coins removed successfully', data: studentCoins };
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Controller method for adding coins.
 */
const postAddCoins = async (req, res) => {
  const { studentId, numberOfCoins, teacherToken } = req.body;
  try {
    const result = await addCoinsToStudent(studentId, numberOfCoins, teacherToken);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller method for removing coins.
 */
const postRemoveCoins = async (req, res) => {
  const { studentId, numberOfCoins, teacherToken } = req.body;
  try {
    const result = await removeCoinsFromStudent(studentId, numberOfCoins, teacherToken);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions
module.exports = {
  postAddCoins,
  postRemoveCoins,
};
