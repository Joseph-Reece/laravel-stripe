<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe;
use Session;
use App\Traits\StripeHelperTrait;

class StripeController extends Controller
{

    use StripeHelperTrait;
    //
    /**
     * payment view
     */
    public function handleGet()
    {
        $account = User::find(auth()->user()->id)->account;
        // dd($account);
        Inertia::share('app', [
            'Stripe_key' => env('STRIPE_KEY'),
        ]);

        return Inertia::render('Stripe/Gateway', [

        ]);
    }

    /**
     * handling payment with POST
     */
    public function handlePost(Request $request)
    {
        $account = User::find(auth()->user()->id)->account;
        // dd($request);

        $paymentIntent = $this->createPaymentIntent($account->customer_id, 300 * 100);

        Inertia::share('app', [
            'Stripe_key' => env('STRIPE_KEY'),
            'Stripe_secret' => $paymentIntent->client_secret,
        ]);

        return response()->json(['paymentIntent' => $paymentIntent->client_secret]);

    }
}

