import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders can switch to form', async () => {
  // Arrange
  render(<App />);
  fireEvent.click(screen.getByText(/ingredients/i))
  const checkboxes = await screen.findAllByRole('checkbox')
  shuffle(checkboxes)

  // Act flow with assert
  fireEvent.click(checkboxes[0])
  await screen.findAllByRole("menuitem", {name:/ingredients: 1/i})
  fireEvent.click(checkboxes[1])
  await screen.findAllByRole("menuitem", {name:/ingredients: 2/i})

  // Assert

});




function shuffle<I>(array:I[]) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
