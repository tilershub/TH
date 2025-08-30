import React from 'react'

// About Page
export const About = () => {
  return (
    <main className="container" style={{ padding: '40px 20px', maxWidth: '900px' }}>
      <h1>About Us</h1>
      <p><strong>TILERSHUB</strong> is Sri Lanka's leading platform for finding verified tilers and tile-related products.</p>
      
      <p>We help homeowners find reliable professionals and affordable tools for any tiling project — big or small. Whether you are looking to tile a bathroom, kitchen, or an entire house, we make it easier by offering a directory of top-rated tilers, an accurate cost estimator, and a shop for essential tools and materials.</p>
      
      <p>Our mission is to bring trust, transparency, and simplicity to the tiling industry by:</p>
      <ul>
        <li>📍 Listing only verified professionals with real reviews</li>
        <li>📐 Offering smart estimators for accurate budgeting</li>
        <li>🛠️ Selling tested, trusted tools from our marketplace</li>
      </ul>
      
      <p>We are based in Gampaha, Sri Lanka, and proudly support both local tilers and homeowners across the island.</p>
    </main>
  )
}

// Contact Page
export const Contact = () => {
  return (
    <main className="container" style={{ padding: '40px 20px', maxWidth: '900px' }}>
      <h1>Contact Us</h1>
      <p>If you have any questions, suggestions, or business inquiries, we'd love to hear from you!</p>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ padding: '8px 0' }}><strong>📞 Phone:</strong> 0774503744</li>
        <li style={{ padding: '8px 0' }}><strong>📧 Email:</strong> <a href="mailto:tilershub@gmail.com">tilershub@gmail.com</a></li>
        <li style={{ padding: '8px 0' }}><strong>📍 Address:</strong> Gampaha, Sri Lanka</li>
        <li style={{ padding: '8px 0' }}><strong>🔗 Facebook:</strong> <a href="https://www.facebook.com/tilershub" target="_blank" rel="noopener noreferrer">@tilershub</a></li>
        <li style={{ padding: '8px 0' }}><strong>💬 WhatsApp:</strong> <a href="https://wa.me/94774503744" target="_blank" rel="noopener noreferrer">Chat with us</a></li>
      </ul>
    </main>
  )
}

// Privacy Policy Page
export const PrivacyPolicy = () => {
  return (
    <main className="container" style={{ padding: '40px 20px', maxWidth: '900px' }}>
      <h1>Privacy Policy</h1>
      
      <p>This Privacy Policy explains how TILERSHUB collects, uses, and safeguards your information when you use our website.</p>
      
      <h3>1. Information We Collect</h3>
      <p>We may collect your name, email address, phone number, and other contact information when you submit a form or interact with our services.</p>
      
      <h3>2. Use of Cookies</h3>
      <p>We use cookies to improve your experience on our website. Google AdSense and other partners may also use cookies to serve personalized ads.</p>
      
      <h3>3. How We Use Your Data</h3>
      <p>Your data is used to provide and improve our services, send updates, respond to inquiries, and personalize your experience.</p>
      
      <h3>4. Third-Party Services</h3>
      <p>We may display ads or links that lead to third-party sites. These external sites have their own privacy policies and practices.</p>
      
      <h3>5. Consent</h3>
      <p>By using our website, you agree to our privacy policy and consent to the use of cookies.</p>
    </main>
  )
}

// Terms Page
export const Terms = () => {
  return (
    <main className="container" style={{ padding: '40px 20px', maxWidth: '900px' }}>
      <h1>Terms & Conditions</h1>
      
      <p>By using TILERSHUB, you agree to the following terms:</p>
      
      <h3>1. Use of Content</h3>
      <p>You may not reproduce or distribute any content from this site without permission.</p>
      
      <h3>2. Accuracy</h3>
      <p>While we strive for accuracy, we do not guarantee that all information is up-to-date or complete.</p>
      
      <h3>3. Liability</h3>
      <p>We are not liable for any loss or damage resulting from the use of our site or services.</p>
      
      <h3>4. Modifications</h3>
      <p>We may update these terms at any time. Your continued use of the site means you accept any changes.</p>
    </main>
  )
}

// Disclaimer Page
export const Disclaimer = () => {
  return (
    <main className="container" style={{ padding: '40px 20px', maxWidth: '900px' }}>
      <h1>Disclaimer</h1>
      
      <p>The information provided on TILERSHUB is for general informational purposes only.</p>
      
      <p>All content is provided in good faith, but we make no representation or warranty of any kind regarding accuracy, adequacy, validity, or completeness.</p>
      
      <p>Any action you take based on the information found on this website is strictly at your own risk. TILERSHUB will not be liable for any losses or damages from the use of our site.</p>
      
      <p>We recommend consulting a professional before making decisions based on content from our site.</p>
    </main>
  )
}