function objectLookUp(arrayOfObjs, newObjKey, newObjValue) {
  const lookup = {};
  for (let i = 0; i < arrayOfObjs.length; i++) {
    const keyName = arrayOfObjs[i][newObjKey];
    const keyValue = arrayOfObjs[i][newObjValue];
    lookup[keyName] = keyValue;
  }
  return lookup;
}

module.exports = objectLookUp;
