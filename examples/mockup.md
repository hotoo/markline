
# Static Demo

- order: 3

----

<link rel="stylesheet" href="../timeline.css" type="text/css" media="screen" charset="utf-8">
<div id="demo" class="markline">
  <header>Static Demo</header>
  <div class="dates">
    <ol>
      <li>1983</li>
      <li>1984</li>
      <li>1985</li>
      <li>1986</li>
      <li>1987</li>
      <li>1988</li>
      <li>1989</li>
      <li>1990</li>
    </ol>
  </div>
  <div class="events" id="events">
    <div class="groups">
      <label>Default</label>
      <ol>
        <li style="left:30px;">
          <ol style="width:50px;">
            <li style="left:20px;" title="event 1">event 1</li>
          </ol>
          <time>1983</time>
          <label>text</label>
        </li>

        <li style="left:50px;">
          <ol style="width:100px;">
            <li style="left:50px;" title="event 1">event 1</li>
            <li style="left:60px;width:20px;" title="event 2">event 2</li>
          </ol>
          <time>1983</time>
          <label>text</label>
        </li>

        <li style="left:150px;">
          <ol style="width:800px;">
            <li style="left:50px;" title="event 1">event 1</li>
            <li style="left:60px;width:20px;" title="event 2">event 2</li>
          </ol>
          <time>1983</time>
          <label>text</label>
        </li>
      </ol>

    </div>
    <div class="groups">
      <label>电子产品系列好长的内容</label>
      <ol>
        <li style="left:50px;">
          <ol style="width:100px;">
            <li style="left:50px;" title="event 1">event 1</li>
            <li style="left:60px;width:20px;" title="event 2">event 2</li>
          </ol>
          <time>1983</time>
          <label>text</label>
        </li>

        <li style="left:50px;">
          <ol style="width:100px;">
            <li style="left:50px;" title="event 1">event 1</li>
            <li style="left:60px;width:20px;" title="event 2">event 2</li>
          </ol>
          <time>1983</time>
          <label>text</label>
        </li>

        <li style="left:50px;">
          <ol style="width:100px;">
            <li style="left:50px;" title="event 1">event 1</li>
            <li style="left:60px;width:20px;" title="event 2">event 2</li>
          </ol>
          <time>1983</time>
          <label>text</label>
        </li>

      </ol>
    </div>
  </div>
</div>

<script>
var markline = document.querySelector(".markline");
var dates = document.querySelector(".dates");
document.getElementById("events").onscroll = function(evt){
  dates.style.top = document.body.scrollTop + "px";
}
</script>
