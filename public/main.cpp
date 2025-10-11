#include <iostream>
#include <tofu.hpp>

void onMainThreadTick(Tofu::IMainThreadContext& context) {
  auto& eventManager = context.getEventManager();
  auto events = eventManager.getAllEvents();
  events.forEach([](const Tofu::EngineEvent& ev){
    if (ev.getEventType() != Tofu::EngineEventType::MouseMotion) {
      std::cout <<
        "==================" <<
        std::endl <<
        ev.toString() <<
        "==================" <<
        std::endl <<
        std::endl;
    }
  });
}

int main() {
  Tofu::EngineParameters startupParams("HelloTofu", "0.0.1", "com.tofu.hello", "Hello Tofu!");
  auto initializeFuture = Tofu::initialize(startupParams);
  initializeFuture.wait();
  auto initializeResult = initializeFuture.get();
  
  if (initializeResult.getStatus() == Tofu::ResultStatus::Failure) {
    std::cerr <<
      "Tofu initialization failed. Error: " << 
      initializeResult.getError().getMessage() << 
      std::endl;
    return EXIT_FAILURE;
  }

  std::unique_ptr<Tofu::IEngine> enginePtr = initializeResult.acquire();
  Tofu::IContentManager& contentManager = enginePtr->getContentManager();

  auto modelLoadFuture = contentManager.loadModel("test_model");
  modelLoadFuture.wait();
  auto modelLoadResult = modelLoadFuture.get();
  if (modelLoadResult.getStatus() == Tofu::ResultStatus::Failure) {
    std::cerr <<
      "Tofu model load failed. Error: " << 
      modelLoadResult.getError().getMessage() << 
      std::endl;
    return EXIT_FAILURE;
  }
  auto modelPtr = modelLoadResult.acquire();

  Tofu::IControlFlowManager& controlFlow = enginePtr->getControlFlowManager();
  controlFlow.registerMainThreadStartCallback([&](Tofu::IMainThreadContext& context) {
    auto& scene = context.getScene();
    scene.addModel(*modelPtr);
  });
  controlFlow.registerMainThreadFrameTickCallback(onMainThreadTick);
  enginePtr->start();
  enginePtr->waitUntilStopped();

  return EXIT_SUCCESS;
}
