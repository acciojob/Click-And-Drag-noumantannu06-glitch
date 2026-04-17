// Your code here.
function initCubes() {
            const container = document.getElementById('container');
            const numCubes = 6; // Any number
            const cubeSize = 80;
            const cols = 3;
            const rows = Math.ceil(numCubes / cols);

            for (let i = 0; i < numCubes; i++) {
                const cube = document.createElement('div');
                cube.className = 'cube';
                cube.dataset.id = i + 1;
                cube.style.left = `${20 + (i % cols) * (cubeSize + 20)}px`;
                cube.style.top = `${20 + Math.floor(i / cols) * (cubeSize + 20)}px`;
                container.appendChild(cube);
                makeDraggable(cube, container);
            }
        }

        function makeDraggable(cube, container) {
            let isDragging = false;
            let shiftX, shiftY;
            let initialX, initialY;

            cube.ondragstart = () => false; // Disable native drag

            cube.onmousedown = (e) => {
                e.preventDefault();
                isDragging = true;

                // Calculate initial shift
                const rect = cube.getBoundingClientRect();
                shiftX = e.clientX - rect.left;
                shiftY = e.clientY - rect.top;

                // Store initial position
                initialX = parseFloat(cube.style.left) || 20;
                initialY = parseFloat(cube.style.top) || 20;

                // Bring to front
                cube.style.zIndex = 1000;
                cube.style.transition = 'none'; // Smooth immediate move

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            };

            function onMouseMove(e) {
                if (!isDragging) return;

                let newLeft = e.clientX - shiftX - container.getBoundingClientRect().left;
                let newTop = e.clientY - shiftY - container.getBoundingClientRect().top;

                // Constrain within container bounds
                const contRect = container.getBoundingClientRect();
                const cubeRect = cube.getBoundingClientRect();
                const contWidth = contRect.width;
                const contHeight = contRect.height;
                const cubeWidth = cube.offsetWidth;
                const cubeHeight = cube.offsetHeight;

                newLeft = Math.max(0, Math.min(newLeft, contWidth - cubeWidth));
                newTop = Math.max(0, Math.min(newTop, contHeight - cubeHeight));

                cube.style.left = newLeft + 'px';
                cube.style.top = newTop + 'px';
            }

            function onMouseUp() {
                isDragging = false;

                // Reset z-index and transition
                cube.style.zIndex = '';
                cube.style.transition = 'box-shadow 0.2s';

                // Clean up
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
        }

        // Initialize on load
        window.addEventListener('load', initCubes);
