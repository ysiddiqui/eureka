import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare let $: any;

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit {

  contactUsForm: FormGroup;

  reasonOther: boolean = false;
  areYouOther: boolean = false;
  submited: boolean = false;

  reasonDropdownError: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    $(document).ready(() => {

      $('#websiteCarousel').carousel({
        interval: 6000,
        pause: "false"
      });

      $(window).on('load', function() {
        $("#preloader").delay(600).fadeOut();
      });
      $('body').scrollspy({
        target: '#nav',
        offset: $(window).height() / 2
      });
      $("#nav .main-nav a[href^='#']").on('click', function(e) {
        e.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
          scrollTop: $(this.hash).offset().top
        }, 600);
      });
      $('#back-to-top').on('click', function(){
        $('body,html').animate({
          scrollTop: 0
        }, 600);
      });
      $('#nav .nav-collapse').on('click', function() {
        $('#nav').toggleClass('open');
      });
      $('.has-dropdown a').on('click', function() {
        $(this).parent().toggleClass('open-drop');
      });
      $(window).on('scroll', function() {
        var wScroll = $(this).scrollTop();
    
        // Fixed nav
        wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');
    
        // Back To Top Appear
        wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut();
      });
      $('.work').magnificPopup({
        delegate: '.lightbox',
        type: 'image'
      });
      $('#about-slider').owlCarousel({
        items:1,
        loop:true,
        margin:15,
        nav: true,
        navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        dots : true,
        autoplay : true,
        animateOut: 'fadeOut'
      });
    
      $('#testimonial-slider').owlCarousel({
        loop:true,
        margin:15,
        dots : true,
        nav: false,
        autoplay : true,
        responsive:{
          0: {
            items:1
          },
          992:{
            items:2
          }
        }
      });

    });

    this.contactUsForm = this.formBuilder.group({
      reason: ['', Validators.required],
      otherReason: ['', Validators.required],
      areYou: ['Please Select...', Validators.required],
      otherAreYou: ['', Validators.required],
      name: ['', Validators.required],
      emailFrom: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('')]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });

    // this.contactUsForm.get('reason').setValue('Please Select...');
    this.contactUsForm.get('areYou').setValue('Please Select...');

  }

  otherReason(e): void {

    this.contactUsForm.controls.reason.setValue(e.target.value, {
      onlySelf: true
    })
  }

  otherAreYou(): void {
    if(this.contactUsForm.get('areYou').value == 'Other') {
      this.areYouOther = true;
    } else {
      this.areYouOther = false;
    }
  }

  get f() { return this.contactUsForm.controls; }

  contactUsSubmit(contactUs: any) {
    this.submited = true;

    if(!this.contactUsForm.valid) {
      console.log('Form Invalid');
      return false;
    }

    console.log('Form is valid...');

  }

}
