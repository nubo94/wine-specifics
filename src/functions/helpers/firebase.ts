import firebase from "@/firebase/clientApp";

export interface IDOC {
  doc: "form";
  field?: Object;
  collection: "winesForms";
}
/**
 * update document's firebase by field
 * @param {IDOC} doc document to update
 * @param {IDOC} collection collection to update
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

/**
 * get document's firebase by doc
 * @param {IDOC} collection collection to get, format e.g. winesForms
 * @param {IDOC} doc document to get, e.g. form
 */

export function _getDoc({ collection, doc }: IDOC) {
  const db = firebase.firestore();
  return db
    .collection(collection)
    .doc(doc)
    .get()
    .then((res) => {
      if (res.exists) {
        return res.data();
      }
      return null;
    })
    .catch((err) => {
      return err;
    });
}
