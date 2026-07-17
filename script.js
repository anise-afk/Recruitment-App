// Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // File upload handling
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');

    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = '#6366f1';
        uploadZone.style.background = '#f8fafc';
    });

    uploadZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = '#e2e8f0';
        uploadZone.style.background = 'transparent';
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = '#e2e8f0';
        uploadZone.style.background = 'transparent';
        
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        handleFiles(files);
    });

    // Score threshold slider
    const scoreThreshold = document.getElementById('scoreThreshold');
    const thresholdValue = document.getElementById('thresholdValue');
    
    if (scoreThreshold) {
        scoreThreshold.addEventListener('input', function() {
            thresholdValue.textContent = this.value;
        });
    }
});

// Handle file uploads
function handleFiles(files) {
    const tableBody = document.getElementById('resumesTableBody');
    
    Array.from(files).forEach(file => {
        const fileType = file.name.split('.').pop().toUpperCase();
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${file.name.replace(/\.[^/.]+$/, "")}</td>
            <td><span class="file-type ${fileType.toLowerCase()}">${fileType}</span></td>
            <td><span class="status processing">Processing</span></td>
            <td>-</td>
            <td>
                <button class="btn-icon" title="View Details">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                </button>
                <button class="btn-icon" title="Delete">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </td>
        `;
        
        tableBody.insertBefore(row, tableBody.firstChild);
        
        // Simulate parsing after 2 seconds
        setTimeout(() => {
            const statusCell = row.querySelector('.status');
            statusCell.className = 'status parsed';
            statusCell.textContent = 'Parsed';
            
            const skillsCell = row.querySelectorAll('td')[3];
            const skillCount = Math.floor(Math.random() * 20) + 5;
            skillsCell.textContent = `${skillCount} skills`;
        }, 2000);
    });
}

// Parse all resumes
function parseAllResumes() {
    const processingRows = document.querySelectorAll('.status.processing');
    
    processingRows.forEach((status, index) => {
        setTimeout(() => {
            status.className = 'status parsed';
            status.textContent = 'Parsed';
            
            const row = status.closest('tr');
            const skillsCell = row.querySelectorAll('td')[3];
            const skillCount = Math.floor(Math.random() * 20) + 5;
            skillsCell.textContent = `${skillCount} skills`;
        }, (index + 1) * 1500);
    });
}

// Export resumes to CSV
function exportResumes() {
    alert('Exporting resumes to CSV... (In production, this would generate a downloadable CSV file)');
}

// Profile modal functions
function showProfileModal() {
    document.getElementById('profileModal').classList.add('active');
}

function closeProfileModal() {
    document.getElementById('profileModal').classList.remove('active');
}

// Edit profile
function editProfile(profileId) {
    showProfileModal();
}

// View candidates for a profile
function viewCandidates(profileId) {
    // Switch to shortlisting section
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    
    document.querySelector('[data-section="shortlisting"]').classList.add('active');
    document.getElementById('shortlisting').classList.add('active');
    
    // Set the profile in dropdown
    const profileSelect = document.getElementById('profileSelect');
    if (profileSelect) {
        profileSelect.value = profileId;
    }
}

// Update shortlisting based on threshold
function updateShortlisting() {
    const threshold = document.getElementById('scoreThreshold').value;
    const candidates = document.querySelectorAll('.candidate-card');
    
    candidates.forEach(candidate => {
        const score = parseInt(candidate.querySelector('.score-value').textContent);
        
        if (score < threshold) {
            candidate.style.display = 'none';
        } else {
            candidate.style.display = 'block';
        }
    });
}

// Run AI shortlisting
function runShortlisting() {
    const candidates = document.querySelectorAll('.candidate-card');
    const threshold = document.getElementById('scoreThreshold').value;
    
    // Show loading state
    candidates.forEach(candidate => {
        candidate.style.opacity = '0.5';
    });
    
    // Simulate AI processing
    setTimeout(() => {
        candidates.forEach(candidate => {
            candidate.style.opacity = '1';
            const score = parseInt(candidate.querySelector('.score-value').textContent);
            
            if (score >= threshold) {
                candidate.style.display = 'block';
            } else {
                candidate.style.display = 'none';
            }
        });
        
        alert(`AI shortlisting complete! ${Array.from(candidates).filter(c => c.style.display !== 'none').length} candidates match your criteria.`);
    }, 2000);
}

// Export shortlist to Excel
function exportShortlist() {
    alert('Exporting shortlist to Excel... (In production, this would generate an Excel file with candidate details)');
}

// Auto-shortlist top candidates
function autoShortlist() {
    const candidates = document.querySelectorAll('.candidate-card');
    const sortedCandidates = Array.from(candidates).sort((a, b) => {
        const scoreA = parseInt(a.querySelector('.score-value').textContent);
        const scoreB = parseInt(b.querySelector('.score-value').textContent);
        return scoreB - scoreA;
    });
    
    // Show top 10
    candidates.forEach(candidate => {
        candidate.style.display = 'none';
    });
    
    sortedCandidates.slice(0, 10).forEach(candidate => {
        candidate.style.display = 'block';
    });
    
    alert('Top 10 candidates have been auto-shortlisted!');
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('profileModal');
    if (e.target === modal) {
        closeProfileModal();
    }
});

// Form submission
document.querySelector('.profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // In production, this would save the profile to a database
    alert('Job profile created successfully!');
    closeProfileModal();
});

// Schedule call modal functions
function showScheduleModal() {
    document.getElementById('scheduleModal').classList.add('active');
}

function closeScheduleModal() {
    document.getElementById('scheduleModal').classList.remove('active');
}

// Book appointment from shortlisting
function bookAppointment(candidateName) {
    document.getElementById('candidateName').value = candidateName;
    showScheduleModal();
}

// Start call function
function startCall(candidateName) {
    alert(`Starting call with ${candidateName}... (In production, this would integrate with your phone system)`);
}

// Mark as hired function
function markAsHired(candidateName) {
    if (confirm(`Are you sure you want to mark ${candidateName} as hired?`)) {
        alert(`${candidateName} has been marked as successfully hired!`);
        // In production, this would update the database and move the candidate to the hired report
    }
}

// Delete profile function
function deleteProfile(profileId) {
    if (confirm('Are you sure you want to delete this job profile? This action cannot be undone.')) {
        alert('Job profile deleted successfully!');
        // In production, this would remove the profile from the database
    }
}

// Navigate to section function
function navigateToSection(sectionId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Drag and Drop functionality
let selectedCandidates = [];

document.addEventListener('DOMContentLoaded', function() {
    const draggables = document.querySelectorAll('.draggable');
    const dropZone = document.getElementById('dropZone');
    const dropPlaceholder = document.getElementById('dropPlaceholder');
    const selectedCandidatesContainer = document.getElementById('selectedCandidates');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            draggable.classList.add('dragging');
            e.dataTransfer.setData('text/plain', JSON.stringify({
                name: draggable.dataset.candidate,
                role: draggable.dataset.role
            }));
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        
        const data = e.dataTransfer.getData('text/plain');
        if (data) {
            const candidate = JSON.parse(data);
            addCandidateToDropZone(candidate);
        }
    });
});

function addCandidateToDropZone(candidate) {
    // Check if candidate already exists
    if (selectedCandidates.some(c => c.name === candidate.name)) {
        return;
    }

    selectedCandidates.push(candidate);
    updateDropZone();
}

function updateDropZone() {
    const dropPlaceholder = document.getElementById('dropPlaceholder');
    const selectedCandidatesContainer = document.getElementById('selectedCandidates');

    if (selectedCandidates.length > 0) {
        dropPlaceholder.classList.add('hidden');
    } else {
        dropPlaceholder.classList.remove('hidden');
    }

    selectedCandidatesContainer.innerHTML = '';

    selectedCandidates.forEach((candidate, index) => {
        const initials = candidate.name.split(' ').map(n => n[0]).join('');
        const item = document.createElement('div');
        item.className = 'selected-candidate-item';
        item.innerHTML = `
            <div class="selected-candidate-avatar">${initials}</div>
            <div class="selected-candidate-info">
                <div class="selected-candidate-name">${candidate.name}</div>
                <div class="selected-candidate-role">${candidate.role}</div>
            </div>
            <button class="remove-candidate-btn" onclick="removeCandidate(${index})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;
        selectedCandidatesContainer.appendChild(item);
    });
}

function removeCandidate(index) {
    selectedCandidates.splice(index, 1);
    updateDropZone();
}

function clearDropZone() {
    selectedCandidates = [];
    updateDropZone();
}

function bookSelectedCalls() {
    if (selectedCandidates.length === 0) {
        alert('Please drag candidates to the booking zone first.');
        return;
    }

    const names = selectedCandidates.map(c => c.name).join(', ');
    alert(`Booking calls for: ${names}\n\nIn production, this would open the scheduling modal for each candidate.`);
    clearDropZone();
}

// Simulate real-time updates
setInterval(() => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const currentValue = parseInt(stat.textContent);
        if (!isNaN(currentValue) && currentValue > 100) {
            const change = Math.floor(Math.random() * 3) - 1;
            const newValue = currentValue + change;
            stat.textContent = newValue;
        }
    });
}, 10000);
