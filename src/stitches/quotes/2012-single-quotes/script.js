document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.cs-item');
  let expandedItem = null;
  const minWidth = 768; // Minimum width in pixels for the script to be active
  const maxWidth = 1300; // Maximum width in pixels for the script to be active

  function handleResize() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= minWidth && windowWidth < maxWidth) {
      addClickListeners();
      resetItems();
    } else {
      removeClickListeners();
      items.forEach(item => {
        item.classList.remove('expanded', 'collapsed');
      });
    }
  }

  function addClickListeners() {
    items.forEach(item => {
      item.addEventListener('click', itemClickHandler);
    });
  }

  function removeClickListeners() {
    items.forEach(item => {
      item.removeEventListener('click', itemClickHandler);
    });
  }

  function itemClickHandler(e) {
    e.preventDefault();

    if (this === expandedItem) {
      collapseItem(this);
    } else {
      if (expandedItem) {
        collapseItem(expandedItem);
      }
      expandItem(this);
    }
  }

  function expandItem(clickedItem) {
    resetItems(); // Reset all items first

    // Add a class to expand the clicked item
    clickedItem.classList.add('expanded');
    expandedItem = clickedItem;

  }

  function collapseItem(item) {
    item.classList.remove('expanded');
    expandedItem = null;

    items.forEach(otherItem => {
      otherItem.classList.remove('collapsed');
    });
  }

  function resetItems() {
    items.forEach(item => {
      item.classList.remove('expanded', 'collapsed');
    });
    expandedItem = null;
  }


  // Initial setup
  handleResize();

  // Add event listener for window resize
  window.addEventListener('resize', handleResize);
});