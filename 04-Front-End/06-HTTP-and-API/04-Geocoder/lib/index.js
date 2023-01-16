// note(valerieschraauwers): they don't know stimulus yet now that we moved this exercise
// TODO: Call the Mapbox API when the form is submitted

const getCoordinates = () => {
  const url = '...?'

  fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  })
  .then(response => response.json())
  .then((data) => {
    console.log(data);
  });
}
