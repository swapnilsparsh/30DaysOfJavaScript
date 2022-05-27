<?php
  if(isset($_POST['str'])) 
    $string = $_POST['str'];
  else 
    $string = "";

  echo <<<_END
<!DOCTYPE html>
<html>
  <head>
    <title>Graph Plotter</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script type='text/javascript' src='functions.js'></script>
  </head>
  <body>
    <center>
    <h1><u><i>Graph Plot</i></u></h1>  
    <form name='myForm' method='post' action='graph.php' onsubmit='return main()'>
      Enter equation: <input type='text' name='str' 
                        value='$string' maxlength='80' >
      <input type='hidden' name='equation' value='return equation()'>
      <input type='submit' value='Plot'><br>
    </form>
    <br>
    <div id='error'>
    </div>
    <canvas id='graphArea' width='640' height='480'>
      Graph Area.
    </canvas>
    <script>
      drawGraph();
_END;
      if(isset($_POST['str'])) {
        echo <<<_END
        var l_LHS, l_RHS, s = "";
        var str = '$string';
        l_LHS = findSIDE(str, str.length, 0);
        if(l_LHS != null) 
          l_RHS = findSIDE(str, str.length, 1);
        if(l_RHS != null) {
          if(hasComplexFunction(str, str.length) == 1) {
            plotComplex(str, l_LHS, l_RHS);
          }
          else if(hasComplexFunction(str, str.length) == 0) { 
            plotGraph(l_LHS, l_RHS);
          }
        }
                
_END;
      } 
      echo <<<_END
  
    </script>

    </center>      
  <hr>
  <center>
    <ul class='menu'>
    <li><a href='Instructions.html' class='link'>Instructions</a></li>&nbsp;&nbsp;&nbsp;
    <li><a href='About.html' class='link'>About</a></li>
    </ul>
    <br>&copy;2022 All rights reserved
  </center>
  </body>
</html>
_END;

?>
