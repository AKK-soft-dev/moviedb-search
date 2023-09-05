export function calculateAge(dateOfBirth: string) {
  const dobArray = dateOfBirth.split("-");
  const year = parseInt(dobArray[0]);
  const month = parseInt(dobArray[1]) - 1; // Subtract 1 as months are zero-indexed
  const day = parseInt(dobArray[2]);

  const currentDate = new Date();
  let age = currentDate.getFullYear() - year;

  // Check if the birthday has occurred this year
  if (
    currentDate.getMonth() < month ||
    (currentDate.getMonth() === month && currentDate.getDate() < day)
  ) {
    age--;
  }

  return age;
}

// Function to calculate age at the time of death
export function calculateAgeAtDeath(dateOfBirth: string, dateOfDeath: string) {
  const dobArray = dateOfBirth.split("-");
  const dodArray = dateOfDeath.split("-");

  const birthYear = parseInt(dobArray[0]);
  const birthMonth = parseInt(dobArray[1]) - 1; // Subtract 1 as months are zero-indexed
  const birthDay = parseInt(dobArray[2]);

  const deathYear = parseInt(dodArray[0]);
  const deathMonth = parseInt(dodArray[1]) - 1; // Subtract 1 as months are zero-indexed
  const deathDay = parseInt(dodArray[2]);

  const birthDate = new Date(birthYear, birthMonth, birthDay);
  const deathDate = new Date(deathYear, deathMonth, deathDay);

  // Calculate the age
  const ageInMillis = deathDate.valueOf() - birthDate.valueOf();

  // Convert age to years
  const ageInYears = ageInMillis / (365 * 24 * 60 * 60 * 1000);

  return Math.floor(ageInYears);
}
