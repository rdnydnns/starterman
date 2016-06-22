const btn = document.body.querySelector('#btn');
const door = document.body.querySelector('#door');
let status = 'closed';

let h = door.offsetHeight/window.innerHeight * 100;

let openId;
let closeId;

btn.addEventListener('click', () => {
  switch(status) {
    case 'closed':
    case 'stopped while closing':
      status = 'opening';
      openId = setInterval(open, 500);
      break;
    case 'open':
    case 'stopped while opening':
      status = 'closing';
      closeId = setInterval(close, 500);
      break;
    case 'closing':
      status = 'stopped while closing'
      stopDoor();
      break;
    default:
      status = 'stopped while opening'
      stopDoor();
  }

  console.log(status);
});

function open() {
  h -= 10;
  console.log(h);
  door.style.height = `${h}%`;

  if (door.style.height === '0%') {
    console.log('cycle complete');
    status = 'open';
    clearInterval(openId);
  }
}

function close() {
  h += 10;
  console.log(h);
  door.style.height = `${h}%`;

  if (door.style.height === '100%') {
    console.log('cycle complete');
    status = 'closed'
    clearInterval(closeId);
  }
}

function stopDoor() {
  clearInterval(openId);
  clearInterval(closeId);
}
