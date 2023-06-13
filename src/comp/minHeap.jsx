import React, { useState, useRef, useEffect } from "react";

class MinHeap {
   constructor(selector) {
      this.items = [];
      this.selector = selector;
   }

   seek() {
      return this.items[0];
   }

   push(item) {
      let i = this.items.length;
      this.items.push(item);
      while (
         i > 0 &&
         this.selector(this.items[Math.floor((i + 1) / 2 - 1)]) >
         this.selector(this.items[i])
      ) {
         let t = this.items[i];
         this.items[i] = this.items[Math.floor((i + 1) / 2 - 1)];
         this.items[Math.floor((i + 1) / 2 - 1)] = t;
         i = Math.floor((i + 1) / 2 - 1);
      }
   }

   pop() {
      if (this.items.length <= 1) return this.items.pop();
      const ret = this.items[0];
      this.items[0] = this.items.pop();
      let i = 0;
      while (true) {
         let lowest =
            this.selector(this.items[(i + 1) * 2]) <
               this.selector(this.items[(i + 1) * 2 - 1])
               ? (i + 1) * 2
               : (i + 1) * 2 - 1;
         if (this.selector(this.items[i]) > this.selector(this.items[lowest])) {
            let t = this.items[i];
            this.items[i] = this.items[lowest];
            this.items[lowest] = t;
            i = lowest;
         } else break;
      }
      return ret;
   }

   delete(item) {
      let i = this.items.indexOf(item);
      // heapify
      this.items[i] = this.items.pop();
      while (true) {
         let lowest =
            this.selector(this.items[(i + 1) * 2]) <
               this.selector(this.items[(i + 1) * 2 - 1])
               ? (i + 1) * 2
               : (i + 1) * 2 - 1;
         if (this.selector(this.items[i]) > this.selector(this.items[lowest])) {
            let t = this.items[i];
            this.items[i] = this.items[lowest];
            this.items[lowest] = t;
            i = lowest;
         } else break;
      }
   }

   heapify(arr) {
      for (let i = 0; i < arr.length; i++) {
         this.push(arr[i]);
      }
   }
}

const posy = (i) => Math.floor(Math.log2(i + 1)) * 50 + 20;

const posx = (i) => {
   const level = Math.floor(Math.log2(i + 1));
   const len = Math.pow(2, level);
   const j = i - len + 2;
   const k = j / (len + 1) - 0.5;
   const x = k * 1400 + 700;
   return x;
};

const HeapVisualization = () => {
   const canvasRef = useRef(null);
   const [heap, setHeap] = useState(new MinHeap((x) => x));
   const [inputValue, setInputValue] = useState("");
   const [items, setItems] = useState([]);

   useEffect(() => {
      const ctx = canvasRef.current.getContext("2d");
      visualize(ctx, items);
   }, [items]);

   const visualize = (ctx, arr) => {
      ctx.strokeStyle = "#FF0000";
      ctx.font = "14px Arial";
      ctx.clearRect(0, 0, 1400, 700);
      for (let i = 0; i < arr.length; i++) {
         ctx.beginPath();
         ctx.moveTo(posx(i), posy(i));
         const j = Math.floor((i + 1) / 2 - 1);
         ctx.lineTo(posx(j), posy(j));
         ctx.stroke();
      }
      for (let i = 0; i < arr.length; i++) {
         ctx.beginPath();
         ctx.arc(posx(i), posy(i), 12, 0, 2 * Math.PI);
         ctx.stroke();
         ctx.fillStyle = "#99ff99";
         ctx.fill();
         ctx.fillStyle = "#000000";
         ctx.fillText(arr[i], posx(i) - 4, posy(i) + 4);
      }
   };

   const handlePush = () => {
      const val = parseInt(inputValue);
      if (isNaN(val)) return alert("Value is not a number");
      heap.push(val);
      setItems([...heap.items]);
   };

   const handlePop = () => {
      heap.pop();
      setItems([...heap.items]);
   };

   return (
      <div className="asd"> 
         
         <div>
            <input
               type="text"
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handlePush}>Push</button>
            <button onClick={handlePop}>Pop</button>
         </div>
         <canvas ref={canvasRef} width={1400} height={700} />
      </div>
   );
};

export default HeapVisualization;