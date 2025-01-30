document.addEventListener('DOMContentLoaded', function() {
    // Generate table of contents
    const headings = document.querySelectorAll('.main-content h2, .main-content h3');
    const toc = document.getElementById('tableOfContents');
    
    headings.forEach((heading, index) => {
        const id = `section-${index}`;
        heading.id = id;
        
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = heading.textContent;
        a.style.paddingLeft = heading.tagName === 'H3' ? '1rem' : '0';
        
        li.appendChild(a);
        toc.appendChild(li);
    });

    // Search functionality
    const searchBox = document.querySelector('.search-box input');
    searchBox.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                window.location.href = `/search?q=${encodeURIComponent(query)}`;
            }
        }
    });
});
