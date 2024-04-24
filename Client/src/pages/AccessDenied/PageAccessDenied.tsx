import './PageAccessDenied.css'
import Header from '../../components/layout/Header/Header'

function PageAccessDenied() {
	return (
		<div className="container">
			<Header />
			<div className="accessdenied__wrapper">
				<h1 className="accessdenied__message">Access Denied</h1>
				<pre className="accessdenied__art">
					{`              ████████                                  
                              ██████        ██████                            
                          ▓▓▓▓░░░░░░░░░░░░░░░░░░░░▓▓██                        
                        ██  ░░░░░░░░▒▒▒▒▒▒▒▒░░░░░░    ██                      
                      ██░░░░░░░░▒▒▒▒████████▒▒▒▒░░░░░░░░██                    
                    ██  ░░░░▒▒▒▒████        ████▒▒▒▒░░░░  ██                  
                  ▓▓░░░░░░▒▒████                ████▒▒░░░░░░▓▓                
                  ██░░░░▒▒██                        ██▒▒░░░░██                
                ██░░░░▒▒██                            ██▒▒░░░░██              
                ██░░▒▒██                                ██▒▒░░██              
              ▒▒░░░░▒▒██                                ██▒▒░░░░▒▒            
              ██░░░░▒▒██                                ██▒▒░░░░██            
            ██  ░░▒▒██                                    ██▒▒░░  ██          
            ██░░░░▒▒██                                    ██▒▒░░░░██          
            ██░░░░▒▒██                                    ██▒▒░░░░██          
            ██░░░░▒▒██                                    ██▒▒░░░░██          
            ██░░░░▒▒██                                    ██▒▒░░░░██          
            ██░░░░▒▒██                                    ██▒▒░░░░██          
            ██░░░░▒▒██                                    ██▒▒░░░░██          
            ██░░░░▒▒██                                    ██▒▒░░░░██          
            ██░░░░▒▒██                                    ██▒▒░░░░██          
            ██░░░░▒▒██                                    ██▒▒░░░░██          
      ▒▒▒▒▒▒██░░░░▒▒██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██▒▒░░░░██▒▒▒▒▒▒    
    ██░░░░░░██▒▒▒▒▒▒██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██▒▒▒▒▒▒██░░░░░░██  
  ██░░░░░░░░░░██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██████░░░░░░░░░░██
  ██░░░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░░░██
  ██░░░░░░████████████████████████████████████████████████████████████░░░░░░██
  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
  ██░░░░▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░░░██
  ██░░░░▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░░░██
  ██░░░░▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░░░██
  ██▒▒░░▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░▒▒██
  ██▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒██
  ██▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒██
  ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
    ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██  
      ████████████████████████████████████████████████████████████████████    
                    `}
				</pre>
			</div>
		</div>
	)
}

export default PageAccessDenied
