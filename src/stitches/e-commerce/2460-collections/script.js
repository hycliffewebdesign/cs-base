(function () {
      const timer = document.querySelector('#collection-2460 .cs-timer');
      if (!timer) return;
    
      const items = timer.querySelectorAll('#collection-2460 .cs-timer-item');
      if (items.length < 4) return;
    
      // -----------------------------------------
      // 1) SET YOUR END TIME HERE
      // -----------------------------------------
      // Example: countdown to Dec 31, 2026 at 23:59:59 local time
      const END_TIME = new Date('2025-12-31T23:59:59'); // <-- CHANGE THIS
    
      // Helper to update the display
      function renderRemaining(msRemaining) {
        if (msRemaining < 0) msRemaining = 0;
    
        let totalSeconds = Math.floor(msRemaining / 1000);
    
        const days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
    
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
    
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
    
        items[0].childNodes[0].nodeValue = days + ' ';
        items[1].childNodes[0].nodeValue = hours.toString().padStart(2, '0') + ' ';
        items[2].childNodes[0].nodeValue = minutes.toString().padStart(2, '0') + ' ';
        items[3].childNodes[0].nodeValue = seconds.toString().padStart(2, '0') + ' ';
      }
    
      function tick() {
        const now = new Date();
        const diff = END_TIME - now; // ms until end
        renderRemaining(diff);
    
        if (diff <= 0) {
          clearInterval(intervalId);
          // Optional: do something when it reaches zero
          // e.g. timer.classList.add('cs-timer--finished');
        }
      }
    
      // Initial call so it updates immediately on load
      tick();
    
      // Update every second
      const intervalId = setInterval(tick, 1000);
    })();