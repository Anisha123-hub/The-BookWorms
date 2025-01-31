import React from 'react'

export default function Footer() {
    return (
        <>
<footer class="container-fluid bg-light pt-4">
      <div class="container">
        <div class="row">
          <div class="col-md-3 mb-3" id="about-us">
            <h3>The BookWorms</h3>
            <p>
              Enhancing the reading experience for readers by fostering
              connections and building a vibrant community of book lovers.
            </p>
          </div>

          <div class="col-md-3 mb-3">
            <h3>Quick Links</h3>
            <ul class="list-unstyled">
              <li><a href="#" class="text-decoration-none">Home</a></li>
              <li>
                <a href="Sign_up.html" class="text-decoration-none">Community</a>
              </li>
            </ul>
          </div>


          <div class="col-md-3 mb-3" id="contact-us">
            <h3>Contact Us</h3>
            <p>
              Email:
              <a
                href="mailto:info@thebookworms.com"
                class="text-decoration-none"
                >info@thebookworms.com</a>
            </p>
            <p>Phone: +977-123-456789</p>
            <p>Address: Kathmandu, Nepal</p>
          </div>


          <div class="col-md-3 mb-3">
            <h3>Follow Us</h3>
            <div>
              <a href="https://www.facebook.com/"
              target="_blank"
              class= "me-3" 
                ><i class="fab fa-facebook-f"></i></a>
              <a href="https://x.com/" 
              target="_blank"
              class="me-3"><i class="fab fa-twitter"></i></a>
              <a href="https://www.instagram.com/" 
              target="_blank"
              class="me-3"><i class="fab fa-instagram"></i></a>
              <a href="https://linkedin.com/" 
              target="_blank"
              class="me-3"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center py-3 bg-secondary">
        <p class="mb-0">&copy; 2025 The BookWorms. All Rights Reserved.</p>
      </div>
    </footer>
        </>
    )
}
