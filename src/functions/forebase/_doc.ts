import firebase from "@/firebase/clientApp";

export interface IDOC {
  field?: Object;
  doc: string;
  collection: "winesForms";
}
/**
 * update document's firebase by field
 * @param {IDOC} collection collection to update
 * @param {IDOC} doc document to update
 * @param {IDOC} field field to update in the document, e.g. { avatar: string }
 */

export function _updateDoc({ collection, doc, field }: IDOC) {
  const db = firebase.firestore();
  return db
    .collection(collection)
    .doc(doc)
    .update(field)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
}

/**
 * create document's firebase
 * @param {IDOC} collection collection to create
 * @param {IDOC} doc document to update
 * @param {IDOC} field fields to create in the document, e.g. { name: string }
 */

export function _createDoc({ collection, doc, field }: IDOC) {
  const db = firebase.firestore();
  return db
    .collection(collection)
    .doc(doc)
    .set(field)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
}
