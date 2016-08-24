function(doc) {
  if(doc.type == 'bestelling') {
    emit(doc._id, doc);
  }
}