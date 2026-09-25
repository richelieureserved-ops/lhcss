document.querySelector('#events')?.remove();
document.querySelector('#admissions .notice')?.remove();
document.querySelector('#school .lead').insertAdjacentText('beforeend', ' The current principal is Mrs. Florence Gustave-Denis.');
const clubsGrid = document.querySelector('#clubs .clubs-grid');
const additionalClubs = [
  ['Red Cross', 'Service, first aid awareness, and community care.'],
  ['Environment Club', 'Environmental responsibility, conservation, and action.'],
  ['Arts and Crafts', 'Making, design, creativity, and practical expression.'],
  ['French Club', 'French language, culture, and communication.'],
  ['Spanish Club', 'Spanish language, culture, and conversation.'],
  ['Fusion Steel Orchestra', 'Music, rhythm, performance, and teamwork.'],
  ['Dukers', 'School spirit, participation, and student connection.'],
  ['Chef Helpers', 'Food preparation, hospitality, and practical skills.'],
  ['Dance Club', 'Movement, performance, confidence, and coordination.'],
  ['Cultural Club', 'Heritage, traditions, creativity, and celebration.']
];
additionalClubs.forEach(([name, description]) => {
  const club = document.createElement('div');
  club.className = 'club';
  club.innerHTML = `<h3>${name}</h3><p>${description}</p>`;
  clubsGrid.appendChild(club);
});
const clubCategories = {
  'Service & leadership': ['Cadets', 'Red Cross', 'Environment Club', 'Student Council', 'Dukers'],
  'Arts & culture': ['Literary', 'Photography', 'Arts and Crafts', 'Fusion Steel Orchestra', 'Dance Club', 'Cultural Club'],
  'Academics & tech': ['Science', 'IT', 'Debate', 'Chess Club', 'French Club', 'Spanish Club'],
  'Student wellbeing': ['Drug Free', 'Peer Helper', 'Boys Legacy', 'Girls Moving Forward', 'Chef Helpers']
};
const clubsByName = new Map([...clubsGrid.children].map(club => [club.querySelector('h3').textContent, club]));
clubsGrid.innerHTML = '';
Object.entries(clubCategories).forEach(([category, names]) => {
  const group = document.createElement('div');
  group.className = 'club-category';
  group.innerHTML = `<h3>${category}</h3><div class="category-clubs"></div>`;
  const categoryClubs = group.querySelector('.category-clubs');
  names.forEach(name => {
    if (clubsByName.has(name)) categoryClubs.appendChild(clubsByName.get(name));
  });
  clubsGrid.appendChild(group);
});
const houseNames = ['Jesse', 'Ellis', 'Bourne', 'Leon'];
document.querySelectorAll('#school-activities .house p').forEach((label, index) => {
  label.textContent = houseNames[index];
});
const pastStudentPhotos = [
  ['assets/julian-alfred.jpg', 'Julian Alfred'],
  ['assets/johnson-charles.jpg', 'Johnson Charles'],
  ['assets/kenson-casimier.jpg', 'Kenson Casimier'],
  ['assets/menissa-rambally.jpg', 'Menissa Rambally']
];
document.querySelectorAll('#past-student-profiles .past-student img').forEach((image, index) => {
  if (pastStudentPhotos[index]) {
    image.src = pastStudentPhotos[index][0];
    image.alt = pastStudentPhotos[index][1];
  }
});
const anniversaryGallery = document.querySelector('#school-activities .event-card:first-child .photo-strip');
const anniversaryPhotos = [
  ['assets/anniversary-1.jpg', 'Students gathered on the school court for the anniversary parade'],
  ['assets/anniversary-2.jpg', 'Students taking part in the anniversary parade'],
  ['assets/anniversary-3.jpg', 'School community gathered for the anniversary event']
];
const useLocalGallery = (gallery, photos) => {
  if (!gallery) return;
  Promise.all(photos.map(([src]) => new Promise(resolve => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = src;
  }))).then(allLoaded => {
    if (allLoaded.every(Boolean)) {
      gallery.innerHTML = photos.map(([src, alt]) => `<img src="${src}" alt="${alt}">`).join('');
    }
  });
};
useLocalGallery(anniversaryGallery, anniversaryPhotos);
const kweyolGallery = document.querySelector('#school-activities .event-card:nth-child(2) .photo-strip');
const kweyolPhotos = [
  ['assets/kweyol-new-1.jpg', 'Students performing at the Jounen Kweyol celebration'],
  ['assets/kweyol-new-2.jpg', 'Student taking part in the Jounen Kweyol celebration'],
  ['assets/kweyol-new-3.jpg', 'Student dancing at the Jounen Kweyol celebration']
];
useLocalGallery(kweyolGallery, kweyolPhotos);
const sportsDayGallery = document.querySelector('#school-activities .event-card:nth-child(3) .photo-strip');
const sportsDayPhotos = [
  ['assets/kweyol-1.jpg', 'Students competing during Sports Day'],
  ['assets/kweyol-2.jpg', 'Students gathered during Sports Day'],
  ['assets/kweyol-3.jpg', 'School Sports Day activity']
];
useLocalGallery(sportsDayGallery, sportsDayPhotos);
const activities = document.querySelector('#school-activities');
if (activities) {
  const lightbox = document.createElement('dialog');
  lightbox.className = 'gallery-lightbox';
  lightbox.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close image">Close</button><img alt="">';
  document.body.appendChild(lightbox);
  const lightboxImage = lightbox.querySelector('img');
  const closeLightbox = () => lightbox.close();
  activities.addEventListener('click', event => {
    const image = event.target.closest('.photo-strip img');
    if (!image) return;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightbox.showModal();
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });
}
