import React from "react";

const InfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 py-2 px-2 rounded-full flex items-center justify-center w-8 h-8"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>




    <h2><b>Horse Betting Indicators</b></h2>
    <br></br>
    <p>These indicators provide various insights into a horse's betting performance and market behavior. Here's what each indicator generally signifies:</p>
    <br></br>
    <p class="indicator-name">BSP (Betfair Starting Price):</p>
   
    <p><strong>Definition:</strong> The average price at which the horse was traded on the Betfair exchange just before the race starts.</p>
    <p><strong>Insight:</strong> A lower BSP suggests a higher market confidence in the horse's chances of winning. A higher BSP indicates less confidence.</p>
    <br></br>
    <p class="indicator-name">PPWAP (Pre-Play Weighted Average Price):</p>
 
    <p><strong>Definition:</strong> The average price of all matched bets on the horse before the race starts, weighted by the amount of money traded at each price.</p>
    <p><strong>Insight:</strong> Reflects the market's average opinion on the horse's chances before the race starts. It can show how betting sentiment changes leading up to the race.</p>
    <br></br>
    <p class="indicator-name">MorningWAP (Morning Weighted Average Price):</p>
    
    <p><strong>Definition:</strong> The average price of all matched bets on the horse during the morning trading session, weighted by the amount of money traded at each price.</p>
    <p><strong>Insight:</strong> Indicates early market sentiment and can reveal how initial expectations compare to pre-race sentiment (PPWAP).</p>
    <br></br>
    <p class="indicator-name">PPMax (Pre-Play Maximum Price):</p>
   
    <p><strong>Definition:</strong> The highest price at which the horse was traded before the race starts.</p>
    <p><strong>Insight:</strong> Shows the peak of market skepticism or the highest odds offered for the horse, indicating moments of least confidence.</p>
    <br></br>
    <p class="indicator-name">PPMin (Pre-Play Minimum Price):</p>
    
    <p><strong>Definition:</strong> The lowest price at which the horse was traded before the race starts.</p>
    <p><strong>Insight:</strong> Shows the peak of market confidence or the lowest odds offered for the horse, indicating moments of greatest confidence.</p>
    <br></br>
    <p class="indicator-name">IPMax (In-Play Maximum Price):</p>
    
    <p><strong>Definition:</strong> The highest price at which the horse was traded during the race.</p>
    <p><strong>Insight:</strong> Indicates moments during the race when the horse seemed least likely to win, based on live betting activity.</p>
    <br></br>
    <p class="indicator-name">IPMin (In-Play Minimum Price):</p>
  
    <p><strong>Definition:</strong> The lowest price at which the horse was traded during the race.</p>
    <p><strong>Insight:</strong> Indicates moments during the race when the horse seemed most likely to win, based on live betting activity.</p>
    <br></br>
    <p class="indicator-name">MorningTradedVol (Morning Traded Volume):</p>
   
    <p><strong>Definition:</strong> The total amount of money traded on the horse during the morning trading session.</p>
    <p><strong>Insight:</strong> High volume suggests significant early interest and possibly strong opinions about the horse's chances.</p>
  <br></br>
    <p class="indicator-name">PPTradedVol (Pre-Play Traded Volume):</p>
  
    <p><strong>Definition:</strong> The total amount of money traded on the horse before the race starts.</p>
    <p><strong>Insight:</strong> High volume indicates strong overall market interest and potentially strong opinions about the horse's chances.</p>
<br></br>
    <p class="indicator-name">IPTradedVol (In-Play Traded Volume):</p>
    
    <p><strong>Definition:</strong> The total amount of money traded on the horse during the race.</p>
    <p><strong>Insight:</strong> High volume suggests active interest and significant market engagement during the race, indicating fluctuating opinions about the horse's performance as the race unfolds.</p>
    <br></br>
    <p class="indicator-name">Overall Insights:</p>
    <p><strong>Market Confidence and Sentiment:</strong> Lower prices (BSP, PPWAP, MorningWAP, PPMin, IPMin) suggest higher market confidence in the horse's chances. Higher prices (PPMax, IPMax) indicate moments of skepticism.</p>
    <p><strong>Market Activity:</strong> High traded volumes (MorningTradedVol, PPTradedVol, IPTradedVol) indicate strong interest and engagement from bettors, reflecting the significance of the horse in the betting market.</p>
    <p><strong>Market Trends:</strong> Comparing the differences between MorningWAP, PPWAP, and BSP can reveal trends and shifts in market sentiment over time.</p>
    <p>Analyzing these indicators together provides a comprehensive view of how the betting market perceives a horse's chances of winning before and during the race.</p>


    <br></br>
        <p className="text-sm mb-4">
          If you have any questions or need further clarification, don't hesitate to reach out! <br></br>
          <a href="mailto:mustapha.manjoura@gmail.com" className="text-blue-500 hover:text-blue-700">
            mustapha.manjoura@gmail.com
          </a>
        </p>

      </div>
    </div>
  );
};

export default InfoModal;
