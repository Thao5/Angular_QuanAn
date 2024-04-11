import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';
import { decrement, update } from 'src/app/Reducer/MyCartCounterState/counter.actions';
import { MyCartService } from 'src/app/Service/my-cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() c!:any
  carts!: any;
  hcarts!:any
  quantityControl = new FormControl();
  user!: any
  huser!: any
  constructor(private cartService: MyCartService,
     private router: Router,
     private cookie: CookieService,
     private store:Store<{counter: {counter: number}}>,
     private authApi: AuthApiService
     ) { }
  carts$!: Observable<any>;
  Object = Object;
  ngOnInit(): void {
    if(this.cookie.check('cart') === true){
      this.carts = JSON.parse(this.cookie.get('cart'))
      console.log(this.carts)
    }
    console.log(this.carts)
    this.hcarts = this.cookie.check('cart')
    if(this.cookie.check('user') === true)
    {
      this.user = JSON.parse(this.cookie.get('user'))
    }
    this.huser = this.cookie.check('user')
  }

  deleteItem(item: any)
  {
    this.store.dispatch(decrement({ payload: item.soLuong }))
    if(item.idThucAn in this.carts)
    {
        delete this.carts[item.idThucAn];
        this.cookie.set('cart', JSON.stringify(this.carts));

        return this.carts;
    }
  }

  update(value: any){
    this.cookie.set('cart', this.carts);
    let s = Object.values(this.carts).reduce((init:any, current: any) => init + current['soLuong'], 0)
    this.store.dispatch(update({ payload: value}))
    console.log(s)
  }

  pay()
  {
    console.log(JSON.stringify(this.carts))
    // document.location.href='https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=2104426304&vnp_BankCode=NCB&vnp_Command=pay&vnp_CreateDate=20240404011654&vnp_CurrCode=VND&vnp_ExpireDate=20240404013154&vnp_IpAddr=0%3A0%3A0%3A0%3A0%3A0%3A0%3A1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang%3A20714036&vnp_OrderType=other&vnp_ReturnUrl=http%3A%2F%2Flocalhost%3A8080%2Fquanan%2Fapi%2Fpay%2F&vnp_TmnCode=F08ACHP7&vnp_TxnRef=20714036&vnp_Version=2.1.0&vnp_SecureHash=c3f13da453aad150b68c91dad0bf02a6abd113fe899a5ba6d042e43c015f690ae3ff9852537ff961fc520b211028de13eeb70f43ee33caeb126a0a33adaab245'
    this.authApi.post(endpointsAuth.pay, this.carts).subscribe((res) => {
      console.log(res.body)
      this.carts = null
      this.cookie.delete('cart')
      this.store.dispatch(update({payload: 0}))
      console.log(`${res.body}`)
      // document.location.href= `${res.body}`
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Congratulations',
      //   text: 'Chúc mừng bạn đã thanh toán thành công',
      // }).then((result) => {
      //   if(result.isConfirmed)
      //   {
      //     this.router.navigate(['/']);
      //   }
      // })
    })
    //   this.carts = null
    //   this.cookie.delete('cart')
    //   this.store.dispatch(update({payload: 0}))
    // })
  }

  changeQuantity(item:any, event: Event)
  {

    // if(item.idThucAn in this.carts)
    // {
    //   this.cookie.set('cart', JSON.stringify(this.carts));
    //   this.carts = { ...this.carts, [item.idThucAn]: { ...this.carts[item.idThucAn], "soLuong": parseInt() } };
    //     console.log(this.carts)

    //     return this.carts;
    // }
  }
}
