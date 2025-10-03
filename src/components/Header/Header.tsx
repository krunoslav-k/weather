import SearchBar from "../SearchBar/SearchBar";

export default function Header() {
  function handleOnCityChange(cityData) {
    console.log(cityData);
  }

  return (
    <>
      <h1>Weather</h1>
      <SearchBar onCityChange={handleOnCityChange} />
      <p>city placeholder</p>
    </>
  );
}
