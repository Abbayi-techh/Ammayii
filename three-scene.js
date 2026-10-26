// Three.js Interactive 3D Cosmic Experience & Heart Universe
// Designed for Ammayi's Birthday & Friendship Journey

class CosmicExperience {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clock = new THREE.Clock();

    // 3D Objects
    this.particleCloud = null;
    this.heartMesh = null;
    this.orbitRings = [];
    this.memoryNodes = [];
    this.ambientLight = null;
    this.pointLight = null;

    // Interaction & Animation
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.scrollY = 0;
    this.targetScrollY = 0;

    // Raycaster for interactive clicking
    this.raycaster = new THREE.Raycaster();
    this.mouseVec = new THREE.Vector2();

    this.init();
  }

  init() {
    // 1. Scene setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0a0518, 0.0018);

    // 2. Camera setup
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 2000);
    this.camera.position.set(0, 0, 180);

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lights
    this.ambientLight = new THREE.AmbientLight(0xffb6c1, 0.8);
    this.scene.add(this.ambientLight);

    this.pointLight = new THREE.PointLight(0xff69b4, 3, 400);
    this.pointLight.position.set(0, 20, 80);
    this.scene.add(this.pointLight);

    const blueLight = new THREE.PointLight(0x70a6ff, 2, 400);
    blueLight.position.set(-80, -40, 50);
    this.scene.add(blueLight);

    const goldLight = new THREE.PointLight(0xffd700, 2, 400);
    goldLight.position.set(80, 50, 40);
    this.scene.add(goldLight);

    // 5. Build 3D Elements
    this.createParticleCosmos();
    this.create3DHeartCrystal();
    this.createOrbitalRings();
    this.createMemoryConstellationNodes();

    // 6. Event listeners
    window.addEventListener('resize', () => this.onWindowResize());
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('scroll', () => this.onScroll());
    window.addEventListener('click', (e) => this.onClick(e));

    // 7. Start render loop
    this.animate();
  }

  createParticleCosmos() {
    const particleCount = 2200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0xff6fa8), // Rose pink
      new THREE.Color(0xa78bfa), // Lavender purple
      new THREE.Color(0xfcd34d), // Warm star gold
      new THREE.Color(0x38bdf8), // Cyan glow
      new THREE.Color(0xffe4e6)  // Champagne white
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 100 + Math.random() * 500;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (radius * Math.sin(phi) * Math.sin(theta)) * 0.6;
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Particle sprite using canvas
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,210,240,0.8)');
    grad.addColorStop(0.8, 'rgba(255,100,180,0.2)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 3.5,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particleCloud = new THREE.Points(geometry, material);
    this.scene.add(this.particleCloud);
  }

  create3DHeartCrystal() {
    // Mathematical 3D Heart Geometry using Parametric surface
    const xSegments = 40;
    const ySegments = 40;
    const heartGeometry = new THREE.BufferGeometry();
    const positions = [];
    const indices = [];
    const uvs = [];

    // Parametric Heart Formula
    for (let i = 0; i <= xSegments; i++) {
      const u = (i / xSegments) * Math.PI * 2;
      for (let j = 0; j <= ySegments; j++) {
        const v = (j / ySegments) * Math.PI;

        // 3D Heart parametric equation
        const x = 16 * Math.pow(Math.sin(v), 3) * Math.sin(u);
        const y = (13 * Math.cos(v) - 5 * Math.cos(2 * v) - 2 * Math.cos(3 * v) - Math.cos(4 * v)) * 1.1;
        const z = 16 * Math.pow(Math.sin(v), 3) * Math.cos(u) * 0.7;

        positions.push(x * 1.5, y * 1.5, z * 1.5);
        uvs.push(i / xSegments, j / ySegments);
      }
    }

    for (let i = 0; i < xSegments; i++) {
      for (let j = 0; j < ySegments; j++) {
        const a = i * (ySegments + 1) + j;
        const b = (i + 1) * (ySegments + 1) + j;
        const c = (i + 1) * (ySegments + 1) + (j + 1);
        const d = i * (ySegments + 1) + (j + 1);

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    heartGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    heartGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    heartGeometry.setIndex(indices);
    heartGeometry.computeVertexNormals();

    const heartMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff3366,
      emissive: 0x990033,
      emissiveIntensity: 0.35,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.6, // Glassy / Crystal look
      ior: 1.5,
      thickness: 1.8,
      transparent: true,
      opacity: 0.9,
      wireframe: false,
    });

    this.heartMesh = new THREE.Mesh(heartGeometry, heartMaterial);
    this.heartMesh.position.set(0, 0, 0);
    this.heartMesh.rotation.z = Math.PI; // Orient heart correctly
    this.scene.add(this.heartMesh);

    // Inner glowing core
    const coreGeo = new THREE.IcosahedronGeometry(8, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    this.heartMesh.add(core);
  }

  createOrbitalRings() {
    const ringRadii = [38, 48, 58];
    const colors = [0xff69b4, 0x8b5cf6, 0x38bdf8];

    ringRadii.forEach((radius, idx) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.4, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: colors[idx],
        emissive: colors[idx],
        emissiveIntensity: 0.6,
        roughness: 0.2,
        transparent: true,
        opacity: 0.75
      });

      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2 + (idx * 0.4);
      ring.rotation.y = idx * 0.3;
      this.orbitRings.push({ mesh: ring, speedX: 0.005 * (idx + 1), speedY: 0.007 * (idx + 1) });
      this.scene.add(ring);
    });
  }

  createMemoryConstellationNodes() {
    // 5 Key Memory milestones that orbit or float in 3D
    const milestones = [
      { id: "chap-1", label: "9th & 10th Bond", color: 0xec4899, x: -45, y: 25, z: 20 },
      { id: "chap-2", label: "10th Bday Bash", color: 0x8b5cf6, x: 45, y: 20, z: -15 },
      { id: "chap-3", label: "Nov 9 Talent Show", color: 0xef4444, x: -35, y: -25, z: 25 },
      { id: "chap-4", label: "White Dress Meet", color: 0x06b6d4, x: 40, y: -20, z: 30 },
      { id: "chap-5", label: "Dasara & Forever", color: 0xf59e0b, x: 0, y: 45, z: -20 }
    ];

    milestones.forEach((m) => {
      const group = new THREE.Group();
      group.position.set(m.x, m.y, m.z);

      // Node sphere
      const sphereGeo = new THREE.SphereGeometry(3.5, 32, 32);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: m.color,
        emissive: m.color,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.3
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.userData = { id: m.id, label: m.label };
      group.add(sphere);

      // Halo ring around node
      const haloGeo = new THREE.RingGeometry(4.2, 5.2, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: m.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      group.add(halo);

      this.scene.add(group);
      this.memoryNodes.push({ group, sphere, halo, origPos: { x: m.x, y: m.y, z: m.z }, data: m });
    });
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove(e) {
    this.targetMouseX = (e.clientX - window.innerWidth / 2) * 0.001;
    this.targetMouseY = (e.clientY - window.innerHeight / 2) * 0.001;

    // Raycast coordinate update
    this.mouseVec.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouseVec.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  onScroll() {
    this.targetScrollY = window.scrollY;
  }

  onClick(e) {
    if (!this.camera) return;
    this.raycaster.setFromCamera(this.mouseVec, this.camera);
    const intersectableObjects = this.memoryNodes.map(n => n.sphere);
    if (this.heartMesh) intersectableObjects.push(this.heartMesh);

    const intersects = this.raycaster.intersectObjects(intersectableObjects, false);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      if (hit === this.heartMesh) {
        if (window.audioManager) window.audioManager.playSparkle();
        this.pulseHeart();
        if (typeof window.triggerConfetti === 'function') {
          window.triggerConfetti();
        }
      } else if (hit.userData && hit.userData.id) {
        if (window.audioManager) window.audioManager.playPop();
        const targetElement = document.getElementById(hit.userData.id);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetElement.classList.add('highlight-pulse');
          setTimeout(() => targetElement.classList.remove('highlight-pulse'), 2000);
        }
      }
    }
  }

  pulseHeart() {
    if (!this.heartMesh) return;
    gsap.to(this.heartMesh.scale, {
      x: 1.35,
      y: 1.35,
      z: 1.35,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Smooth Lerp Mouse & Scroll
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;
    this.scrollY += (this.targetScrollY - this.scrollY) * 0.05;

    // Rotate Particle Universe
    if (this.particleCloud) {
      this.particleCloud.rotation.y = elapsedTime * 0.03 + this.mouseX * 0.5;
      this.particleCloud.rotation.x = elapsedTime * 0.015 + this.mouseY * 0.5;
    }

    // Animate 3D Heart
    if (this.heartMesh) {
      this.heartMesh.rotation.y = Math.sin(elapsedTime * 0.8) * 0.3 + (this.scrollY * 0.002);
      this.heartMesh.rotation.x = Math.sin(elapsedTime * 0.5) * 0.15;
      // Gentle heartbeat pulse
      const pulse = 1 + Math.sin(elapsedTime * 3) * 0.04 + Math.sin(elapsedTime * 6) * 0.02;
      this.heartMesh.scale.set(pulse, pulse, pulse);
    }

    // Animate Orbital Rings
    this.orbitRings.forEach((ringObj, idx) => {
      ringObj.mesh.rotation.z += ringObj.speedX;
      ringObj.mesh.rotation.x += ringObj.speedY;
    });

    // Animate Memory Constellation Nodes
    this.memoryNodes.forEach((node, idx) => {
      const floatY = Math.sin(elapsedTime * 1.5 + idx) * 3;
      node.group.position.y = node.origPos.y + floatY;
      node.halo.rotation.z += 0.02;
      node.halo.lookAt(this.camera.position);
    });

    // Dynamic Camera Motion mapped to scroll & mouse
    const scrollFactor = this.scrollY * 0.08;
    this.camera.position.x = Math.sin(elapsedTime * 0.2 + this.mouseX) * 15 + (this.mouseX * 40);
    this.camera.position.y = Math.cos(elapsedTime * 0.2) * 8 - (this.mouseY * 30) - (scrollFactor * 0.2);
    this.camera.position.z = 180 - (Math.min(scrollFactor, 80));

    this.camera.lookAt(0, -scrollFactor * 0.1, 0);

    this.renderer.render(this.scene, this.camera);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.cosmicExperience = new CosmicExperience('three-canvas-container');
});
