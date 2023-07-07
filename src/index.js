import './style.css';
import axios from 'axios';

const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
const gameID = 'YOUR_GAME_ID'; // Replace with the game ID obtained from the API

const scoreTable = document.querySelector('.score-table');
const refreshButton = document.querySelector('.refresh');
const scoreForm = document.querySelector('#score-form');
const nameInput = document.querySelector('#name');
const scoreInput = document.querySelector('#score');

// Function to fetch and display scores
const refreshScores = async () => {
  try {
    const response = await axios.get(`${baseURL}games/${gameID}/scores/`);
    const scores = response.data.result;

    scoreTable.innerHTML = '';

    scores.forEach((score) => {
      const scoreElement = document.createElement('div');
      scoreElement.textContent = `User: ${score.user} - Score: ${score.score}`;
      scoreTable.appendChild(scoreElement);
    });
  } catch (error) {
    // Handle the error without using any console statements
  }
};

// Event listener for Refresh button
refreshButton.addEventListener('click', refreshScores);

// Function to add a new score
async function addScore(event) {
  event.preventDefault();

  const name = nameInput.value;
  const score = Number(scoreInput.value);

  if (!name || !score) {
    return;
  }

  try {
    await axios.post(`${baseURL}games/${gameID}/scores/`, {
      user: name,
      score,
    });

    nameInput.value = '';
    scoreInput.value = '';
    refreshScores();
  } catch (error) {
    // Handle the error without using any console statements
  }
}

// Event listener for Submit button
scoreForm.addEventListener('submit', addScore);

// Initial fetch of scores when the page loads
refreshScores();
