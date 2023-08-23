const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Helper function to calculate the mean
const calculateMean = (nums) => {
  const sum = nums.reduce((acc, num) => acc + num, 0);
  return sum / nums.length;
};

// Helper function to calculate the median
const calculateMedian = (nums) => {
  const sortedNums = nums.sort((a, b) => a - b);
  const middle = Math.floor(sortedNums.length / 2);
  if (sortedNums.length % 2 === 0) {
    return (sortedNums[middle - 1] + sortedNums[middle]) / 2;
  } else {
    return sortedNums[middle];
  }
};

// Helper function to calculate the mode
const calculateMode = (nums) => {
  const frequencyMap = {};
  nums.forEach((num) => {
    frequencyMap[num] = frequencyMap[num] + 1 || 1;
  });

  let maxFrequency = 0;
  let mode = null;
  for (const num in frequencyMap) {
    if (frequencyMap[num] > maxFrequency) {
      maxFrequency = frequencyMap[num];
      mode = num;
    }
  }

  return mode;
};

// Route for calculating the mean
app.get('/mean', (req, res) => {
    const numsQuery = req.query.nums;
    if (!numsQuery) {
      return res.status(400).json({ error: 'nums are required' });
    }
    
    const nums = numsQuery.split(',').map(Number);
    if (nums.some(isNaN)) {
      return res.status(400).json({ error: 'Invalid number(s) provided' });
    }
    
    if (nums.length === 0) {
      return res.status(400).json({ error: 'At least one number is required' });
    }
    
    const mean = calculateMean(nums);
    res.json({ operation: 'mean', value: mean });
  });
  

// Route for calculating the median
app.get('/median', (req, res) => {
  const nums = req.query.nums.split(',').map(Number);
  if (nums.some(isNaN)) {
    return res.status(400).json({ error: 'Invalid number(s) provided' });
  }
  if (nums.length === 0) {
    return res.status(400).json({ error: 'nums are required' });
  }
  const median = calculateMedian(nums);
  res.json({ operation: 'median', value: median });
});

// Route for calculating the mode
app.get('/mode', (req, res) => {
  const nums = req.query.nums.split(',').map(Number);
  if (nums.some(isNaN)) {
    return res.status(400).json({ error: 'Invalid number(s) provided' });
  }
  if (nums.length === 0) {
    return res.status(400).json({ error: 'nums are required' });
  }
  const mode = calculateMode(nums);
  res.json({ operation: 'mode', value: mode });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;