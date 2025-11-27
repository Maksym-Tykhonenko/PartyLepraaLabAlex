export const partylepraalabloaderhtml = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body {
    margin: 0;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
</head>

<body>

<svg version="1.1" id="L6" xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100" width="80" height="80">
   <rect fill="none" stroke="#fff" stroke-width="4" x="25" y="25" width="50" height="50">
      <animateTransform
         attributeName="transform"
         dur="0.5s"
         from="0 50 50"
         to="180 50 50"
         type="rotate"
         id="strokeBox"
         attributeType="XML"
         begin="rectBox.end"/>
   </rect>
   <rect x="27" y="27" fill="#fff" width="46" height="50">
      <animate
         attributeName="height"
         dur="1.3s"
         attributeType="XML"
         from="50" 
         to="0"
         id="rectBox" 
         fill="freeze"
         begin="0s;strokeBox.end"/>
   </rect>
</svg>

</body>
</html>
  `;
