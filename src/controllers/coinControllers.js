const AuthModel = require('../models/AuthModel');

const AddCoins = async (req, res) => {
  const { coins, student_id } = req.body;
  
  try {
    if (coins < 0) {
      return res.status(400).json({ message: 'Invalid coin amount' });
    }
    const studentCoin = await AuthModel.find({_id: student_id})
    const totalCoins = studentCoin[0]['coin'] + coins;
    const student = await AuthModel.findByIdAndUpdate(
      {_id: student_id},
      { coin: totalCoins},
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Coins updated successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const DeleteCoins = async (req,res) => {
  const { coins, student_id } = req.body;
  
  try {
    if (coins < 0) {
      return res.status(400).json({ message: 'Invalid coin amount' });
    }
    const studentCoin = await AuthModel.find({_id: student_id})
    const totalCoins = studentCoin[0]['coin'] - coins;
    const student = await AuthModel.findByIdAndUpdate(
      {_id: student_id},
      { coin: totalCoins},
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Coins updated successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// 

module.exports = {AddCoins,DeleteCoins};
