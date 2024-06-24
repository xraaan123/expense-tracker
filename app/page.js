"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDoc,
  QuerySnapshot,
  onSnapshot,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  const [items, setItems] = useState([
    // {
    //   name: "Coffee",
    //   price: 4.95,
    // },
    // {
    //   name: "Movie",
    //   price: 24.95,
    // },
    // {
    //   name: "Candy",
    //   price: 7.95,
    // },
  ]);
  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [total, setTotal] = useState(0);

  // Add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name.trim() !== "" && newItem.price !== "") {
      try {
        // setItems([...items, newItem]);
        console.log(newItem);
        await addDoc(collection(db, "items"), {
          name: newItem.name.trim(),
          price: newItem.price,
        });

        setNewItem({ name: "", price: "" });
      } catch (error) {
        console.log("Erorr adding new item:", error);
      }
    }
  };

  // Read item from database
  useEffect(() => {
    const q = query(collection(db, "items"));
    const unSubscribe = onSnapshot(q, (QuerySnapshot) => {
      let itemsArr = [];

      QuerySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      // Read total from itemsArr
      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce(
          (sum, item) => sum + parseFloat(item.price),
          0
        );
        setTotal(totalPrice);
      };

      calculateTotal();
      return () => unSubscribe();
    });
  }, []);

  // Delete item from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm ">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-l">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="col-span-3 p-3 border"
              type="text"
              placeholder="Enter Item"
            />
            <input
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
              className="col-span-2 p-3 border mx-3"
              type="number"
              placeholder="Enter $"
            />
            <button
              onClick={addItem}
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl"
              type="submit"
            >
              +
            </button>
          </form>
          <ul className="text-white">
            {items.map((item, id) => (
              <li
                key={id}
                className="my-4 w-full flex justify-between bg-slate-950"
              >
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>${item.price}</span>
                </div>
                <button
                  className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"
                  onClick={() => deleteItem(item.id)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>

          {items.length < 1 ? (
            ""
          ) : (
            <div className="text-white flex justify-between p-3">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
