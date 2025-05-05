// Apparition des cartes produits au scroll
window.addEventListener('scroll', () => {
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.classList.add('appear');
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const btnExplorer = document.getElementById("btn");
  const panierListe = document.getElementById("liste-panier");
  const totalSpan = document.getElementById("total");
  const btnValider = document.getElementById("valider-achat");
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDetails = document.getElementById('modal-details');
  const modalClose = document.querySelector('.close');

  let total = 0;

  // Fonction pour ajouter un produit au panier
  function ajouterAuPanier(nom, prix) {
    const item = document.createElement("li");
    item.textContent = `${nom} - ${prix.toLocaleString()} DA`;
    
    // Animation d'ajout au panier
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';

    // Supprimer du panier au clic
    item.addEventListener("click", () => {
      if (confirm(`Supprimer "${nom}" du panier ?`)) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
          panierListe.removeChild(item);
          total -= prix;
          totalSpan.textContent = total.toLocaleString();
        }, 300);
      }
    });

    panierListe.appendChild(item);
    // Déclencher l'animation après l'ajout
    setTimeout(() => {
      item.style.transition = 'all 0.3s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 50);

    total += prix;
    totalSpan.textContent = total.toLocaleString();
  }

  // Bouton Explorer avec animation de scroll
  btnExplorer.addEventListener("click", () => {
    document.getElementById("produits").scrollIntoView({ behavior: "smooth" });
  });

  // Gestion des formulaires avec animation de feedback
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    form.style.transform = 'scale(0.98)';
    setTimeout(() => {
      form.style.transform = 'scale(1)';
      alert('Connexion réussie (simulation) !');
    }, 200);
  });

  document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    form.style.transform = 'scale(0.98)';
    setTimeout(() => {
      form.style.transform = 'scale(1)';
      alert('Compte créé avec succès (simulation) !');
    }, 200);
  });

  // Gestion du modal avec animations
  function openModal(productName) {
    const details = productDetails[productName];
    if (!details) return;

    modalTitle.textContent = productName;
    let content = "<h4>Modèles disponibles :</h4><ul>";
    
    for (const [modele, prix] of Object.entries(details.modèles)) {
      content += `<li>${modele} - ${prix}</li>`;
    }
    content += "</ul>";
    
    content += `<p><strong>Couleurs :</strong> ${details.couleurs.join(", ")}</p>`;
    content += `<p><strong>Stockages :</strong> ${details.stockage.join(", ")}</p>`;
    
    modalDetails.innerHTML = content;
    modal.classList.add('show');
  }

  // Fermeture du modal avec animation
  function closeModal() {
    modal.classList.remove('show');
  }

  modalClose.addEventListener('click', closeModal);
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Animation des boutons "Voir plus"
  document.querySelectorAll('.voir-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      const nom = card.querySelector('h3').textContent;
      openModal(nom);
    });
  });

  // Animation des boutons "Ajouter au panier"
  document.querySelectorAll('.ajouter-panier').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      const nom = card.querySelector('h3').textContent;
      const prixText = card.querySelector('.price').textContent;
      const prix = parseInt(prixText.replace(/\D/g, ''));
      
      // Animation du bouton
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = 'scale(1)';
        ajouterAuPanier(nom, prix);
      }, 200);
    });
  });

  // Animation du bouton "Valider l'achat"
  btnValider.addEventListener("click", () => {
    if (total === 0) {
      alert("Votre panier est vide.");
    } else if (confirm(`Confirmer l'achat de ${total.toLocaleString()} DA ?`)) {
      window.location.href = "paiement.html";
    }
  });
});

// Données des produits
const productDetails = {
  "iPhone 16": {
    modèles: {
      "iPhone 16": "176 400 DA",
      "iPhone 16 Plus": "196 800 DA",
      "iPhone 16 Pro": "236 000 DA",
      "iPhone 16 Pro Max": "256 000 DA"
    },
    couleurs: ["Noir", "Argent", "Bleu", "Or"],
    stockage: ["128 Go", "256 Go", "512 Go", "1 To"]
  },
  "MacBook Pro": {
    modèles: {
      "14 pouces M3": "367 353 DA",
      "16 pouces M3 Pro": "475 000 DA"
    },
    couleurs: ["Gris sidéral", "Argent"],
    stockage: ["512 Go", "1 To", "2 To"]
  },
  "Apple Watch": {
    modèles: {
      "Series 9": "80 703 DA",
      "Ultra 2": "145 000 DA"
    },
    couleurs: ["Noir", "Argent", "Rouge"],
    stockage: ["32 Go"]
  }
};

// Fonction pour le panier (utilisée par le bouton d'achat direct)
function ajouterAuPanier(nom, prix) {
  localStorage.setItem('produitNom', nom);
  localStorage.setItem('totalPanier', prix);
  window.location.href = 'paiement.html';
}
