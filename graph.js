const canva = document.querySelector(".canvas");
const ctx = canva.getContext("2d");
const times = [
  "12 AM", "1 AM", "2 AM", "3 AM",
  "4 AM", "5 AM", "6 AM", "7 AM",
  "8 AM", "9 AM", "10 AM", "11 AM",
  "12 PM", "1 PM", "2 PM", "3 PM",
  "4 PM", "5 PM", "6 PM", "7 PM",
  "8 PM", "9 PM", "10 PM", "11 PM"
];

//cretae graph margin allside
const margin = {
  top: 100,
  right: 80,
  left: 140,
  bottom: 120,
};

//drow line verticle and croses
const width = canva.width;
const height = canva.height;
const gwidth = width - margin.left - margin.right;
const gheight = height - margin.top - margin.bottom;


function genrategraph(temprature, time, tempraturedegree) {
    ctx.clearRect(0, 0, width, height);
    
ctx.moveTo(margin.left, margin.top);
ctx.lineTo(margin.left, margin.top + gheight);
ctx.moveTo(margin.left, margin.top + gheight);
ctx.lineTo(margin.left + gwidth, margin.top + gheight);
ctx.lineWidth = 1;
ctx.strokeStyle = "white";
ctx.stroke();
  function addtext(t, x, y, f, r, c) {
    ctx.save(); // Current canvas state save karo

    ctx.beginPath();
    ctx.font = `${f || "20px"} Arial`;
    ctx.fillStyle = c || "white";

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (r === true) {
      ctx.translate(x, y); // Rotation ki position set karo
      ctx.rotate(-Math.PI / 2); // 90° anticlockwise
      ctx.fillText(t, 0, 0); // Rotated text draw karo
    } else {
      ctx.fillText(t, x, y); // Normal text draw karo
    }

    ctx.restore(); // Canvas ki purani state restore karo
  }

  //write cordinates
  const tgap = gheight / tempraturedegree.length;

  //start path
  let point = {
    x: margin.left,
    y: margin.top + gheight,
  };
  for (let i = 0; i < tempraturedegree.length; i++) {
    const temp = (i + 1) * tgap;
    addtext("--", point.x, point.y - temp);
    addtext(`${tempraturedegree[i]} deg`, point.x - 30, point.y - temp, "12px");
    //add graph dashed line
    addline(
      point.x,
      point.y - temp,
      point.x + gwidth,
      point.y - temp,
      "black",
      0.2,
    );
  }
  //write time

  const timegap = gwidth / time.length;
  for (let i = 0; i < time.length; i++) {
    const temp = (i + 1) * timegap;
    addtext("|", point.x + temp, point.y, "15px");
    addtext(time[i], point.x + temp, point.y + 30, "10px",true);

    addline(
      point.x + temp,
      point.y,
      point.x + temp,
      point.y - gheight,
      "black",
      0.2,
    );
  }
  //write 0
  addtext("0", point.x - 12, point.y + 12, "12px");

  //add thelines

  function addline(x1, y1, x2, y2, c, t) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = t || 1;
    ctx.strokeStyle = c || "white";
    ctx.stroke();
  }

  //add all the point
  //function for add point and throgh a line

  function graphline(x1, y1, x2, y2, c, d) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = c || "white";

    ctx.stroke();
    //generate circle
    ctx.beginPath();
    ctx.arc(x2, y2, 3, 0, Math.PI * 2);
    ctx.fillStyle = d || "green";
    ctx.fill();
  }
  //
  const temp1 = tempraturedegree[tempraturedegree.length - 1];
  const degreeratio = gheight / temp1;
  const timeratio = gwidth / time.length;
  for (let i = 0; i < time.length; i++) {
    //let temp=(i+1)*timeratio;
    let x1 = point.x + i * timeratio + timeratio;
    let y1 = point.y - degreeratio * temprature[i];
    let x2 = point.x + (i + 1) * timeratio + timeratio;
    let y2 = point.y - degreeratio * temprature[i + 1];
    graphline(x1, y1, x2, y2);
  }
}
// canva.addEventListener("mousemove", function(event) {
//     // Canvas ki position nikalo
//     const rect = canva.getBoundingClientRect();
//     // Canvas ke hisaab se mouse ki position
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     console.log("X:", x, "Y:", y);

// });
