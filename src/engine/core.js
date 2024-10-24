class HorrorEngine {
    constructor() {
        // Основные компоненты Three.js
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        
        // Настройка рендерера
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        document.body.appendChild(this.renderer.domElement);

        // Базовое освещение
        this.setupLights();
        
        // Базовая комната для теста
        this.createTestRoom();
        
        // Позиционирование камеры
        this.camera.position.z = 5;
        this.camera.position.y = 2;

        // Обработчик изменения размера окна
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Запуск анимационного цикла
        this.animate();
    }

    setupLights() {
        // Основной свет
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        // Направленный свет
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
    }

    createTestRoom() {
        // Создаем пол
        const floorGeometry = new THREE.PlaneGeometry(10, 10);
        const floorMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x808080,
            roughness: 0.8,
            metalness: 0.2
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);

        // Создаем стены
        const wallGeometry = new THREE.BoxGeometry(10, 5, 0.1);
        const wallMaterial = new THREE.MeshStandardMaterial({
            color: 0x505050,
            roughness: 0.9,
            metalness: 0.1
        });

        // Задняя стена
        const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
        backWall.position.z = -5;
        backWall.position.y = 2.5;
        this.scene.add(backWall);

        // Боковые стены
        const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
        leftWall.rotation.y = Math.PI / 2;
        leftWall.position.x = -5;
        leftWall.position.y = 2.5;
        this.scene.add(leftWall);

        const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
        rightWall.rotation.y = Math.PI / 2;
        rightWall.position.x = 5;
        rightWall.position.y = 2.5;
        this.scene.add(rightWall);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }
}

export default HorrorEngine;