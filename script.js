document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    /* SVG icons ~~~ */
    const sunPath = `
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    `;
    
    const moonPath = `
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    `;

    /* init icon based on current theme */
    const currentTheme = document.documentElement.getAttribute('data-theme');
    themeIcon.innerHTML = currentTheme === 'dark' ? sunPath : moonPath;

    themeToggle.addEventListener('click', (e) => {
        themeToggle.classList.add('animating');
        
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme;

        if (currentTheme === 'dark') {
            newTheme = 'light';
        } else {
            newTheme = 'dark';
        }

        const switchTheme = () => {
            themeIcon.innerHTML = newTheme === 'light' ? moonPath : sunPath;
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        };

        if (!document.startViewTransition) {
            setTimeout(switchTheme, 150);
            setTimeout(() => themeToggle.classList.remove('animating'), 300);
            return;
        }

        const rect = themeToggle.getBoundingClientRect();
        const x = e.clientX || rect.left + rect.width / 2;
        const y = e.clientY || rect.top + rect.height / 2;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(switchTheme);

        transition.ready.then(() => {
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${endRadius}px at ${x}px ${y}px)`
                    ]
                },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    pseudoElement: '::view-transition-new(root)'
                }
            );
        });

        transition.finished.then(() => {
            themeToggle.classList.remove('animating');
        });
    });

    /* calculate age */
    const birthDate = new Date('2003-10-31'); //hello there curious goober looking for my birthday! I appreciate you~~
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    const ageDisplay = document.getElementById('age-display');
    if (ageDisplay) {
        ageDisplay.textContent = `${age} y/o`;
    }
});