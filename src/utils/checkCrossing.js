export const checkCrossing = (travelersArray) => {
  var latArray = [null];
  var lngArray = [null];

  travelersArray = travelersArray.map((x) => x);

  let i = 0.000001;

  // Si plusieurs personnes se chevauchent,
  // Alors ont les déplacent
  travelersArray.forEach((trav) => {
    if (
      latArray[trav.location.coordinates[0]] &&
      lngArray[trav.location.coordinates[1]]
    ) {
      trav.location.coordinates[0] += i;
      trav.location.coordinates[1] += i;
      i += 0.000001;
    }
    latArray[trav.location.coordinates[0]] = trav.id;
    lngArray[trav.location.coordinates[1]] = trav.id;
  });

  return travelersArray;
};
